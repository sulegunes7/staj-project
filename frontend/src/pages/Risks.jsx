import { useEffect, useState } from "react";
import {
  getRisks,
  createRisk,
  updateRisk,
  deleteRisk,
  getProjects,
  getWorkItems,
} from "../services/api";

function Risks() {
  const [risks, setRisks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workItems, setWorkItems] = useState([]);

  const [form, setForm] = useState({
    projectId: "",
    workItemId: "",
    title: "",
    description: "",
    status: "Açık",
    responsible: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [riskData, projectData, workItemData] = await Promise.all([
        getRisks(),
        getProjects(),
        getWorkItems(),
      ]);

      setRisks(riskData);
      setProjects(projectData);
      setWorkItems(workItemData);
    } catch (err) {
      console.error(err);
      setError("Riskler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({
      projectId: "",
      workItemId: "",
      title: "",
      description: "",
      status: "Açık",
      responsible: "",
    });

    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.projectId || !form.title.trim()) {
      alert("Proje ve risk başlığı zorunludur.");
      return;
    }

    const riskData = {
      projectId: Number(form.projectId),
      workItemId: form.workItemId
        ? Number(form.workItemId)
        : null,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      responsible: form.responsible.trim(),
    };

    try {
      if (editingId) {
        await updateRisk(editingId, riskData);
      } else {
        await createRisk(riskData);
      }

      await loadData();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Risk kaydedilemedi.");
    }
  }

  function handleEdit(risk) {
    setEditingId(risk.id);

    setForm({
      projectId: risk.projectId?.toString() || "",
      workItemId: risk.workItemId?.toString() || "",
      title: risk.title || "",
      description: risk.description || "",
      status: risk.status || "Açık",
      responsible: risk.responsible || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Bu riski silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRisk(id);
      await loadData();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert("Risk silinemedi.");
    }
  }

  function getProjectName(projectId) {
    const project = projects.find(
      (item) => item.id === projectId
    );

    return project ? project.name : `Proje #${projectId}`;
  }

  function getWorkItemTitle(workItemId) {
    if (!workItemId) {
      return "-";
    }

    const workItem = workItems.find(
      (item) => item.id === workItemId
    );

    return workItem
      ? workItem.title
      : `İş #${workItemId}`;
  }

  const selectedProjectId = form.projectId
    ? Number(form.projectId)
    : null;

  const filteredWorkItems = selectedProjectId
    ? workItems.filter(
        (item) => item.projectId === selectedProjectId
      )
    : workItems;

  if (loading) {
    return <p>Riskler yükleniyor...</p>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Riskler ve Engeller</h1>
          <p>
            Projelerdeki riskleri ve karşılaşılan engelleri takip edin.
          </p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <h2>{editingId ? "Riski Güncelle" : "Yeni Risk / Engel"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Proje *</label>

              <select
                name="projectId"
                value={form.projectId}
                onChange={(e) => {
                  handleChange(e);

                  setForm((previous) => ({
                    ...previous,
                    projectId: e.target.value,
                    workItemId: "",
                  }));
                }}
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
              <label>İş</label>

              <select
                name="workItemId"
                value={form.workItemId}
                onChange={handleChange}
              >
                <option value="">İş seçin</option>

                {filteredWorkItems.map((workItem) => (
                  <option
                    key={workItem.id}
                    value={workItem.id}
                  >
                    {workItem.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Risk / Engel Başlığı *</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Örn. API bağlantısında gecikme"
              />
            </div>

            <div className="form-group">
              <label>Sorumlu</label>

              <input
                type="text"
                name="responsible"
                value={form.responsible}
                onChange={handleChange}
                placeholder="Sorumlu kişi"
              />
            </div>

            <div className="form-group">
              <label>Durum</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Açık">Açık</option>
                <option value="Devam Ediyor">
                  Devam Ediyor
                </option>
                <option value="Çözüldü">Çözüldü</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>Açıklama</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Risk veya engelin detaylarını yazın..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editingId ? "Güncelle" : "Risk Ekle"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                Vazgeç
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <div className="section-header">
          <h2>Risk Listesi</h2>
          <span>{risks.length} kayıt</span>
        </div>

        {risks.length === 0 ? (
          <p>Henüz kayıtlı risk veya engel bulunmuyor.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Proje</th>
                  <th>İş</th>
                  <th>Risk / Engel</th>
                  <th>Sorumlu</th>
                  <th>Durum</th>
                  <th>Açıklama</th>
                  <th>İşlemler</th>
                </tr>
              </thead>

              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id}>
                    <td>
                      {getProjectName(risk.projectId)}
                    </td>

                    <td>
                      {getWorkItemTitle(risk.workItemId)}
                    </td>

                    <td>
                      <strong>{risk.title}</strong>
                    </td>

                    <td>
                      {risk.responsible || "-"}
                    </td>

                    <td>
                      <span className="status-badge">
                        {risk.status}
                      </span>
                    </td>

                    <td>
                      {risk.description || "-"}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEdit(risk)}
                        >
                          Düzenle
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(risk.id)}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Risks;