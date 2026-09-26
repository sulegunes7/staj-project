import { useEffect, useState } from "react";

import {
  getWorkItems,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
  getProjects,
  getWeeklyReports,
  getUserRole,
} from "../services/api";

function WorkItems() {
  const [workItems, setWorkItems] = useState([]);

  const userRole = getUserRole();
  const isAdmin = userRole === "ADMIN";

  const [projects, setProjects] = useState([]);
  const [weeklyReports, setWeeklyReports] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [reportId, setReportId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filtreler
  const [filterProjectId, setFilterProjectId] = useState("");
  const [filterReportId, setFilterReportId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterResponsible, setFilterResponsible] = useState("");
  const [filterOverdue, setFilterOverdue] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [
        workItemsData,
        projectsData,
        weeklyReportsData,
      ] = await Promise.all([
        getWorkItems(),
        getProjects(),
        getWeeklyReports(),
      ]);

      setWorkItems(workItemsData);
      setProjects(projectsData);
      setWeeklyReports(weeklyReportsData);
    } catch (err) {
      setError("İşler, projeler veya haftalık raporlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setEditingId(null);
    setProjectId("");
    setReportId("");
    setTitle("");
    setDescription("");
    setResponsible("");
    setStatus("TODO");
    setDueDate("");
  }

  function startEditing(workItem) {
    setEditingId(workItem.id);
    setProjectId(String(workItem.projectId));

    setReportId(
      workItem.reportId !== null && workItem.reportId !== undefined
        ? String(workItem.reportId)
        : ""
    );

    setTitle(workItem.title);
    setDescription(workItem.description || "");
    setResponsible(workItem.responsible || "");
    setStatus(workItem.status || "TODO");
    setDueDate(workItem.dueDate || "");

    setError("");
    setSuccess("");
  }

  function cancelEditing() {
    resetForm();
    setError("");
    setSuccess("");
  }

  function handleProjectChange(event) {
    const selectedProjectId = event.target.value;

    setProjectId(selectedProjectId);

    // Proje değişince rapor seçimini temizle
    setReportId("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!projectId) {
      setError("Lütfen bir proje seçin.");
      return;
    }

    if (!title.trim()) {
      setError("İş başlığı boş bırakılamaz.");
      return;
    }

    try {
      setSaving(true);

      const workItem = {
        projectId: Number(projectId),
        reportId: reportId ? Number(reportId) : null,
        title: title.trim(),
        description: description.trim(),
        responsible: responsible.trim(),
        status,
        dueDate: dueDate || null,
      };

      if (editingId !== null) {
        await updateWorkItem(editingId, workItem);
        setSuccess("İş başarıyla güncellendi.");
      } else {
        await createWorkItem(workItem);
        setSuccess("İş başarıyla oluşturuldu.");
      }

      resetForm();
      await loadData();
    } catch (err) {
      setError(
        editingId !== null
          ? "İş güncellenemedi."
          : "İş oluşturulamadı."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(workItem) {
    const confirmed = window.confirm(
      `"${workItem.title}" işini silmek istediğinize emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteWorkItem(workItem.id);

      setSuccess("İş başarıyla silindi.");

      if (editingId === workItem.id) {
        resetForm();
      }

      await loadData();
    } catch (err) {
      setError("İş silinemedi.");
    }
  }

  function getProjectName(id) {
    const project = projects.find((project) => project.id === id);

    return project ? project.name : `Proje #${id}`;
  }

  function getReportName(id) {
    const report = weeklyReports.find((report) => report.id === id);

    if (!report) {
      return id ? `Rapor #${id}` : "Belirtilmemiş";
    }

    return report.week;
  }

  function getStatusLabel(status) {
    switch (status) {
      case "TODO":
        return "Bekliyor";

      case "IN_PROGRESS":
        return "Devam Ediyor";

      case "DONE":
        return "Tamamlandı";

      case "BLOCKED":
        return "Engellendi";

      default:
        return status;
    }
  }

  // Yeni iş oluşturma formundaki haftalık raporlar
  const filteredReports = weeklyReports.filter(
    (report) => String(report.projectId) === String(projectId)
  );

  // Filtrelenmiş işler
  const filteredWorkItems = workItems.filter((workItem) => {
    const projectMatch =
      !filterProjectId ||
      String(workItem.projectId) === String(filterProjectId);

    const reportMatch =
      !filterReportId ||
      String(workItem.reportId) === String(filterReportId);

    const statusMatch =
      !filterStatus ||
      workItem.status === filterStatus;

    const responsibleMatch =
      !filterResponsible ||
      workItem.responsible === filterResponsible;

    const today = new Date().toISOString().split("T")[0];

    const overdueMatch =
      !filterOverdue ||
      (filterOverdue === "true"
        ? workItem.dueDate && workItem.dueDate < today
        : workItem.dueDate && workItem.dueDate >= today);

    return (
      projectMatch &&
      reportMatch &&
      statusMatch &&
      responsibleMatch &&
      overdueMatch
    );
  });

  // Filtreleri sıfırla
  function resetFilters() {
    setFilterProjectId("");
    setFilterReportId("");
    setFilterStatus("");
    setFilterResponsible("");
    setFilterOverdue("");
  }

  return (
    <div className="home-page">

      {/* SAYFA BAŞLIĞI */}
      <div className="page-header">
        <div>
          <h1>İşler</h1>

          <p className="page-subtitle">
            Projelerine ait işleri ve görevleri buradan takip et.
          </p>
        </div>
      </div>

      {/* YENİ İŞ / DÜZENLEME FORMU */}
      {isAdmin && (
        <section className="form-section">

          <h2>
            {editingId !== null
              ? "İşi Düzenle"
              : "Yeni İş Oluştur"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Proje</label>

              <select
                value={projectId}
                onChange={handleProjectChange}
              >
                <option value="">Proje seçin</option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Haftalık Rapor</label>

              <select
                value={reportId}
                onChange={(event) =>
                  setReportId(event.target.value)
                }
                disabled={!projectId}
              >
                <option value="">
                  {projectId
                    ? "Haftalık rapor seçin"
                    : "Önce proje seçin"}
                </option>

                {filteredReports.map((report) => (
                  <option
                    key={report.id}
                    value={report.id}
                  >
                    {report.week}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>İş Başlığı</label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Yapılacak işi girin"
              />
            </div>

            <div className="form-group">
              <label>Açıklama</label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="İş açıklamasını girin"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Sorumlu</label>

              <input
                type="text"
                value={responsible}
                onChange={(event) =>
                  setResponsible(event.target.value)
                }
                placeholder="Sorumlu kişiyi girin"
              />
            </div>

            <div className="form-group">
              <label>Durum</label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="TODO">
                  Bekliyor
                </option>

                <option value="IN_PROGRESS">
                  Devam Ediyor
                </option>

                <option value="DONE">
                  Tamamlandı
                </option>

                <option value="BLOCKED">
                  Engellendi
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Teslim Tarihi</label>

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
              />
            </div>

            <div className="form-actions">

              <button
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Kaydediliyor..."
                  : editingId !== null
                    ? "İşi Güncelle"
                    : "İş Oluştur"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancelEditing}
                >
                  İptal
                </button>
              )}

            </div>

          </form>
        </section>
      )}

      {/* FİLTRELER */}
      <section className="form-section">

        <h2>Filtrele</h2>

        <div className="form-group">
          <label>Proje</label>

          <select
            value={filterProjectId}
            onChange={(event) =>
              setFilterProjectId(event.target.value)
            }
          >
            <option value="">
              Tüm Projeler
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hafta</label>

          <select
            value={filterReportId}
            onChange={(event) =>
              setFilterReportId(event.target.value)
            }
          >
            <option value="">
              Tüm Haftalar
            </option>

            {weeklyReports.map((report) => (
              <option
                key={report.id}
                value={report.id}
              >
                {report.week}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Durum</label>

          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(event.target.value)
            }
          >
            <option value="">
              Tüm Durumlar
            </option>

            <option value="TODO">
              Bekliyor
            </option>

            <option value="IN_PROGRESS">
              Devam Ediyor
            </option>

            <option value="DONE">
              Tamamlandı
            </option>

            <option value="BLOCKED">
              Engellendi
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Sorumlu</label>

          <input
            type="text"
            value={filterResponsible}
            onChange={(event) =>
              setFilterResponsible(event.target.value)
            }
            placeholder="Sorumlu ara..."
          />
        </div>

        <div className="form-group">
          <label>Gecikme</label>

          <select
            value={filterOverdue}
            onChange={(event) =>
              setFilterOverdue(event.target.value)
            }
          >
            <option value="">
              Tümü
            </option>

            <option value="true">
              Gecikmiş
            </option>

            <option value="false">
              Gecikmemiş
            </option>
          </select>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={resetFilters}
        >
          Filtreleri Sıfırla
        </button>

      </section>

      {/* HATA MESAJI */}
      {error && (
        <div className="message error-message">
          ❌ {error}
        </div>
      )}

      {/* BAŞARI MESAJI */}
      {success && (
        <div className="message success-message">
          ✅ {success}
        </div>
      )}

      {/* İŞ LİSTESİ */}
      <section className="projects-section">

        <div className="section-header">

          <div>
            <h2>İş Listesi</h2>

            <p>
              Mevcut işler ve görevler
            </p>
          </div>

          {/* FİLTRELENMİŞ KAYIT SAYISI */}
          {!loading &&
            filteredWorkItems.length > 0 && (
              <span className="project-count">
                {filteredWorkItems.length} iş
              </span>
            )}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="empty-state">
            <p>İşler yükleniyor...</p>
          </div>
        )}

        {/* BOŞ / FİLTRE SONUCU YOK */}
        {!loading &&
          !error &&
          filteredWorkItems.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">
                📋
              </div>

              <h3>
                {workItems.length === 0
                  ? "Henüz iş yok"
                  : "Filtreye uygun iş bulunamadı"}
              </h3>

              <p>
                {workItems.length === 0
                  ? "İlk işinizi oluşturarak çalışma takibine başlayın."
                  : "Farklı filtreler deneyebilir veya filtreleri sıfırlayabilirsiniz."}
              </p>

            </div>
          )}

        {/* FİLTRELENMİŞ İŞLER */}
        {!loading &&
          !error &&
          filteredWorkItems.length > 0 && (

            <div className="project-grid">

              {filteredWorkItems.map((workItem) => (

                <article
                  className="project-card"
                  key={workItem.id}
                >

                  <div className="project-card-top">

                    <span className="project-number">
                      #{workItem.id}
                    </span>

                    <span className="project-status">
                      {getStatusLabel(
                        workItem.status
                      )}
                    </span>

                  </div>

                  <h3>
                    {workItem.title}
                  </h3>

                  <p>
                    {workItem.description ||
                      "Bu iş için henüz açıklama eklenmemiş."}
                  </p>

                  <p>
                    <strong>Proje:</strong>{" "}
                    {getProjectName(
                      workItem.projectId
                    )}
                  </p>

                  <p>
                    <strong>
                      Haftalık Rapor:
                    </strong>{" "}
                    {getReportName(
                      workItem.reportId
                    )}
                  </p>

                  <p>
                    <strong>
                      Sorumlu:
                    </strong>{" "}
                    {workItem.responsible ||
                      "Belirtilmemiş"}
                  </p>

                  <p>
                    <strong>
                      Teslim:
                    </strong>{" "}
                    {workItem.dueDate ||
                      "Belirtilmemiş"}
                  </p>

                  {/* ADMIN AKSİYONLARI */}
                  {isAdmin && (
                    <div className="project-card-footer">

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(workItem)
                        }
                      >
                        Düzenle
                      </button>

                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          handleDelete(workItem)
                        }
                      >
                        Sil
                      </button>

                    </div>
                  )}

                </article>

              ))}

            </div>

          )}

      </section>

    </div>
  );
}

export default WorkItems;