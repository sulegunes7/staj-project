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
    <div>
      <h1>Projeler</h1>

      <h2>
        {editingId !== null ? "Projeyi Düzenle" : "Yeni Proje"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Proje Adı</label>
          <br />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Örn: Staj Projesi"
          />
        </div>

        <br />

        <div>
          <label>Proje Açıklaması</label>
          <br />

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Proje hakkında kısa açıklama"
            rows="5"
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving
            ? "Kaydediliyor..."
            : editingId !== null
              ? "Projeyi Güncelle"
              : "Proje Oluştur"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={cancelEditing}>
            İptal
          </button>
        )}
      </form>

      {error && <p>❌ {error}</p>}

      {success && <p>✅ {success}</p>}

      <hr />

      <h2>Proje Listesi</h2>

      {loading && <p>Projeler yükleniyor...</p>}

      {!loading && !error && projects.length === 0 && (
        <p>Henüz proje bulunmuyor.</p>
      )}

      {!loading && projects.length > 0 && (
        <div>
          {projects.map((project) => (
            <div key={project.id}>
              <h3>{project.name}</h3>

              <p>{project.description}</p>

              <p>
                <strong>Proje ID:</strong> {project.id}
              </p>

              <button onClick={() => startEditing(project)}>
                Düzenle
              </button>

              <button onClick={() => handleDelete(project.id)}>
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;