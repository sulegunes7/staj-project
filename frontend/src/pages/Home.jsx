import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
} from "../services/api";

function Home() {
  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Projeler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function startEditing(project) {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description || "");
    setError("");
    setSuccess("");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setDescription("");
  }

  function cancelEditing() {
    resetForm();
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Proje adı boş bırakılamaz.");
      return;
    }

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateProject(editingId, {
          name: name.trim(),
          description: description.trim(),
        });

        setSuccess("Proje başarıyla güncellendi.");
      } else {
        await createProject({
          name: name.trim(),
          description: description.trim(),
        });

        setSuccess("Proje başarıyla oluşturuldu.");
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(
        editingId !== null
          ? "Proje güncellenemedi."
          : "Proje oluşturulamadı."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <div>
          <h1>Staj Projem</h1>
          <p className="page-subtitle">
            Projelerini ve çalışmalarını buradan takip et.
          </p>
        </div>
      </div>

      <section className="form-section">
        <h2>
          {editingId !== null
            ? "Projeyi Düzenle"
            : "Yeni Proje Oluştur"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Proje Adı</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Proje adını girin"
            />
          </div>

          <div className="form-group">
            <label>Açıklama</label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Proje açıklamasını girin"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Kaydediliyor..."
                : editingId !== null
                  ? "Projeyi Güncelle"
                  : "Proje Oluştur"}
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
            <h2>Projeler</h2>
            <p>Mevcut projelerin</p>
          </div>

          {!loading && projects.length > 0 && (
            <span className="project-count">
              {projects.length} proje
            </span>
          )}
        </div>

        {loading && (
          <div className="empty-state">
            <p>Projeler yükleniyor...</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>Henüz proje yok</h3>
            <p>
              İlk projenizi oluşturarak staj takibine başlayın.
            </p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <span className="project-number">
                    #{project.id}
                  </span>

                  <span className="project-status">
                    Aktif
                  </span>
                </div>

                <h3>{project.name}</h3>

                <p>
                  {project.description ||
                    "Bu proje için henüz açıklama eklenmemiş."}
                </p>

                <div className="project-card-footer">
                  <button
                    onClick={() => startEditing(project)}
                  >
                    Düzenle
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

export default Home;