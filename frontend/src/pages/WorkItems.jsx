import { useEffect, useState } from "react";
import {
  getWorkItems,
  createWorkItem,
  updateWorkItem,
  deleteWorkItem,
  getProjects,
  getWeeklyReports,
} from "../services/api";

function WorkItems() {
  const [workItems, setWorkItems] = useState([]);
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

  const filteredReports = weeklyReports.filter(
    (report) => String(report.projectId) === String(projectId)
  );

  return (
    <div className="home-page">
      <div className="page-header">
        <div>
          <h1>İşler</h1>
          <p className="page-subtitle">
            Projelerine ait işleri ve görevleri buradan takip et.
          </p>
        </div>
      </div>

      <section className="form-section">
        <h2>
          {editingId !== null ? "İşi Düzenle" : "Yeni İş Oluştur"}
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
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Haftalık Rapor</label>

            <select
              value={reportId}
              onChange={(event) => setReportId(event.target.value)}
              disabled={!projectId}
            >
              <option value="">
                {projectId
                  ? "Haftalık rapor seçin"
                  : "Önce proje seçin"}
              </option>

              {filteredReports.map((report) => (
                <option key={report.id} value={report.id}>
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
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Yapılacak işi girin"
            />
          </div>

          <div className="form-group">
            <label>Açıklama</label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="İş açıklamasını girin"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Sorumlu</label>

            <input
              type="text"
              value={responsible}
              onChange={(event) => setResponsible(event.target.value)}
              placeholder="Sorumlu kişiyi girin"
            />
          </div>

          <div className="form-group">
            <label>Durum</label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="TODO">Bekliyor</option>
              <option value="IN_PROGRESS">Devam Ediyor</option>
              <option value="DONE">Tamamlandı</option>
              <option value="BLOCKED">Engellendi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Teslim Tarihi</label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
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

      {error && (
        <div className="message error-message">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="message success-message">
          ✅ {success}
        </div>
      )}

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>İş Listesi</h2>
            <p>Mevcut işler ve görevler</p>
          </div>

          {!loading && workItems.length > 0 && (
            <span className="project-count">
              {workItems.length} iş
            </span>
          )}
        </div>

        {loading && (
          <div className="empty-state">
            <p>İşler yükleniyor...</p>
          </div>
        )}

        {!loading && !error && workItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>Henüz iş yok</h3>
            <p>
              İlk işinizi oluşturarak çalışma takibine başlayın.
            </p>
          </div>
        )}

        {!loading && workItems.length > 0 && (
          <div className="project-grid">
            {workItems.map((workItem) => (
              <article
                className="project-card"
                key={workItem.id}
              >
                <div className="project-card-top">
                  <span className="project-number">
                    #{workItem.id}
                  </span>

                  <span className="project-status">
                    {getStatusLabel(workItem.status)}
                  </span>
                </div>

                <h3>{workItem.title}</h3>

                <p>
                  {workItem.description ||
                    "Bu iş için henüz açıklama eklenmemiş."}
                </p>

                <p>
                  <strong>Proje:</strong>{" "}
                  {getProjectName(workItem.projectId)}
                </p>

                <p>
                  <strong>Haftalık Rapor:</strong>{" "}
                  {getReportName(workItem.reportId)}
                </p>

                <p>
                  <strong>Sorumlu:</strong>{" "}
                  {workItem.responsible || "Belirtilmemiş"}
                </p>

                <p>
                  <strong>Teslim:</strong>{" "}
                  {workItem.dueDate || "Belirtilmemiş"}
                </p>

                <div className="project-card-footer">
                  <button
                    type="button"
                    onClick={() => startEditing(workItem)}
                  >
                    Düzenle
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => handleDelete(workItem)}
                  >
                    Sil
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default WorkItems;