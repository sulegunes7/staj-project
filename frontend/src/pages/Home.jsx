import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
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
      console.error("Projeler yüklenirken hata:", err);
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
    setName(project.name || "");
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

    if (!description.trim()) {
      setError("Proje açıklaması boş bırakılamaz.");
      return;
    }

    const projectData = {
      name: name.trim(),
      description: description.trim(),
    };

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateProject(editingId, projectData);
        setSuccess("Proje başarıyla güncellendi.");
      } else {
        await createProject(projectData);
        setSuccess("Proje başarıyla oluşturuldu.");
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      console.error("Proje kaydedilirken hata:", err);

      setError(
        editingId !== null
          ? "Proje güncellenemedi."
          : "Proje oluşturulamadı."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Bu projeyi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteProject(id);

      setSuccess("Proje başarıyla silindi.");
      await loadProjects();
    } catch (err) {
      console.error("Proje silinirken hata:", err);
      setError("Proje silinemedi.");
    }
  }

  return (
    <div className="projects-page">
      {/* Sayfa başlığı */}

      <div className="page-header">
        <div>
          <span className="page-eyebrow">STAJ TAKİP SİSTEMİ</span>
          <h1>Projeler</h1>
          <p>
            Projelerini oluştur, düzenle ve çalışmalarını tek yerden takip et.
          </p>
        </div>

        <div className="project-count">
          <span>Toplam Proje</span>
          <strong>{projects.length}</strong>
        </div>
      </div>

      {/* Mesajlar */}

      {error && (
        <div className="message message-error">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {success && (
        <div className="message message-success">
          <span>✓</span>
          {success}
        </div>
      )}

      {/* Yeni proje / düzenleme alanı */}

      <section className="project-form-card">
        <div className="section-heading">
          <div className="section-icon">
            {editingId !== null ? "✎" : "+"}
          </div>

          <div>
            <h2>
              {editingId !== null ? "Projeyi Düzenle" : "Yeni Proje"}
            </h2>

            <p>
              {editingId !== null
                ? "Proje bilgilerini güncelleyin."
                : "Yeni bir proje oluşturarak çalışmaya başlayın."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-field">
            <label htmlFor="project-name">Proje Adı</label>

            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Örn: Staj Projesi"
            />
          </div>

          <div className="form-field">
            <label htmlFor="project-description">
              Proje Açıklaması
            </label>

            <textarea
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Proje hakkında kısa bir açıklama yazın..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving
                ? "Kaydediliyor..."
                : editingId !== null
                  ? "Değişiklikleri Kaydet"
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

      {/* Proje listesi */}

      <section className="projects-section">
        <div className="section-title-row">
          <div>
            <h2>Proje Listesi</h2>
            <p>Mevcut projelerinizi buradan yönetebilirsiniz.</p>
          </div>
        </div>

        {loading && (
          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p>Projeler yükleniyor...</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>Henüz proje yok</h3>
            <p>İlk projenizi yukarıdaki formu kullanarak oluşturabilirsiniz.</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <div className="project-icon">📋</div>

                  <span className="project-id">
                    #{project.id}
                  </span>
                </div>

                <h3>{project.name}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-card-footer">
                  <button
                    className="edit-button"
                    onClick={() => startEditing(project)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
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

export default Home;