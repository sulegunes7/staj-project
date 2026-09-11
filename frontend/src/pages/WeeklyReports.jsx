import { useEffect, useState } from "react";
import {
  getWeeklyReports,
  createWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
} from "../services/api";

function WeeklyReports() {
  const [reports, setReports] = useState([]);

  const [week, setWeek] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const data = await getWeeklyReports();
      setReports(data);
    } catch (err) {
      console.error("Haftalık raporlar yüklenirken hata:", err);
      setError("Haftalık raporlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  function startEditing(report) {
    setEditingId(report.id);
    setWeek(report.week || "");
    setContent(report.content || "");
    setProjectId(String(report.projectId ?? ""));

    setError("");
    setSuccess("");
  }

  function resetForm() {
    setEditingId(null);
    setWeek("");
    setContent("");
    setProjectId("");
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

    if (!week.trim()) {
      setError("Hafta bilgisi boş bırakılamaz.");
      return;
    }

    if (!content.trim()) {
      setError("Rapor içeriği boş bırakılamaz.");
      return;
    }

    if (!projectId.trim()) {
      setError("Proje ID boş bırakılamaz.");
      return;
    }

    const reportData = {
      week: week.trim(),
      content: content.trim(),
      projectId: Number(projectId),
    };

    try {
      setSaving(true);

      if (editingId !== null) {
        await updateWeeklyReport(editingId, reportData);
        setSuccess("Rapor başarıyla güncellendi.");
      } else {
        await createWeeklyReport(reportData);
        setSuccess("Rapor başarıyla oluşturuldu.");
      }

      resetForm();
      await loadReports();
    } catch (err) {
      console.error("Rapor kaydedilirken hata:", err);

      setError(
        editingId !== null
          ? "Rapor güncellenemedi."
          : "Rapor oluşturulamadı."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Bu haftalık raporu silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteWeeklyReport(id);

      setSuccess("Haftalık rapor başarıyla silindi.");

      await loadReports();
    } catch (err) {
      console.error("Rapor silinirken hata:", err);
      setError("Haftalık rapor silinemedi.");
    }
  }

  return (
    <div className="reports-page">
      {/* Sayfa başlığı */}

      <div className="page-header">
        <div>
          <span className="page-eyebrow">STAJ TAKİP SİSTEMİ</span>

          <h1>Haftalık Raporlar</h1>

          <p>
            Her hafta yaptığınız çalışmaları kaydedin ve geçmiş
            raporlarınızı kolayca takip edin.
          </p>
        </div>

        <div className="project-count">
          <span>Toplam Rapor</span>
          <strong>{reports.length}</strong>
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

      {/* Rapor formu */}

      <section className="project-form-card">
        <div className="section-heading">
          <div className="section-icon">
            {editingId !== null ? "✎" : "+"}
          </div>

          <div>
            <h2>
              {editingId !== null
                ? "Raporu Düzenle"
                : "Yeni Haftalık Rapor"}
            </h2>

            <p>
              {editingId !== null
                ? "Rapor bilgilerini güncelleyin."
                : "Bu haftaki çalışmalarınızı sisteme kaydedin."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          <div className="report-form-grid">
            <div className="form-field">
              <label htmlFor="report-week">Hafta</label>

              <input
                id="report-week"
                type="text"
                value={week}
                onChange={(event) => setWeek(event.target.value)}
                placeholder="Örn: 2. Hafta"
              />
            </div>

            <div className="form-field">
              <label htmlFor="report-project">Proje ID</label>

              <input
                id="report-project"
                type="number"
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                placeholder="Örn: 1"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="report-content">Rapor İçeriği</label>

            <textarea
              id="report-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Bu hafta yaptığınız çalışmaları yazın..."
              rows="6"
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
                  : "Rapor Oluştur"}
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

      {/* Rapor listesi */}

      <section className="projects-section">
        <div className="section-title-row">
          <div>
            <h2>Rapor Geçmişi</h2>

            <p>
              Daha önce oluşturduğunuz haftalık raporlar.
            </p>
          </div>
        </div>

        {loading && (
          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p>Raporlar yükleniyor...</p>
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>

            <h3>Henüz rapor yok</h3>

            <p>
              İlk haftalık raporunuzu yukarıdaki formu kullanarak
              oluşturabilirsiniz.
            </p>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div className="reports-list">
            {reports.map((report) => (
              <article className="report-card" key={report.id}>
                <div className="report-card-header">
                  <div className="report-week">
                    <div className="report-icon">📝</div>

                    <div>
                      <span>HAFTALIK RAPOR</span>
                      <h3>{report.week}</h3>
                    </div>
                  </div>

                  <span className="project-id">
                    Proje #{report.projectId}
                  </span>
                </div>

                <div className="report-content">
                  <p>{report.content}</p>
                </div>

                <div className="report-card-footer">
                  <button
                    className="edit-button"
                    onClick={() => startEditing(report)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(report.id)}
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

export default WeeklyReports;