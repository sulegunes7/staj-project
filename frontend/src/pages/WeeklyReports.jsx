import { useEffect, useState } from "react";
import {
  getWeeklyReports,
  createWeeklyReport,
  updateWeeklyReport,
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
      setError(
        editingId !== null
          ? "Rapor güncellenemedi."
          : "Rapor oluşturulamadı."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Haftalık Raporlar</h1>
          <p>Staj sürecindeki haftalık çalışmalarını takip et.</p>
        </div>
      </div>

      <section className="form-card">
        <h2>
          {editingId !== null
            ? "Raporu Düzenle"
            : "Yeni Haftalık Rapor"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hafta</label>

            <input
              type="text"
              value={week}
              onChange={(event) => setWeek(event.target.value)}
              placeholder="Örn: 3. Hafta"
            />
          </div>

          <div className="form-group">
            <label>Proje ID</label>

            <input
              type="number"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
              placeholder="Örn: 1"
            />
          </div>

          <div className="form-group">
            <label>Rapor İçeriği</label>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Bu hafta yapılan çalışmaları yazın..."
              rows="6"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Kaydediliyor..."
                : editingId !== null
                  ? "Raporu Güncelle"
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

      <section className="reports-section">
        <div className="section-header">
          <div>
            <h2>Raporlar</h2>
            <p>Geçmiş haftalarda yaptığın çalışmalar.</p>
          </div>

          <span className="report-count">
            {reports.length} rapor
          </span>
        </div>

        {loading && (
          <div className="empty-state">
            <p>Raporlar yükleniyor...</p>
          </div>
        )}

        {!loading && reports.length === 0 && !error && (
          <div className="empty-state">
            <h3>Henüz rapor bulunmuyor</h3>
            <p>İlk haftalık raporunu yukarıdaki formdan oluşturabilirsin.</p>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div className="reports-grid">
            {reports.map((report) => (
              <article className="report-card" key={report.id}>
                <div className="report-card-top">
                  <span className="report-week">
                    {report.week}
                  </span>

                  <span className="report-project">
                    Proje #{report.projectId}
                  </span>
                </div>

                <p className="report-content">
                  {report.content}
                </p>

                <button
                  onClick={() => startEditing(report)}
                  className="edit-button"
                >
                  Düzenle
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default WeeklyReports;