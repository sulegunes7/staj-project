import { useEffect, useState } from "react";
import {
  getProjects,
  getWeeklyReports,
  getWorkItems,
  getRisks,
} from "../services/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [workItems, setWorkItems] = useState([]);
  const [risks, setRisks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [
        projectsData,
        reportsData,
        workItemsData,
        risksData,
      ] = await Promise.all([
        getProjects(),
        getWeeklyReports(),
        getWorkItems(),
        getRisks(),
      ]);

      setProjects(projectsData);
      setReports(reportsData);
      setWorkItems(workItemsData);
      setRisks(risksData);
    } catch (err) {
      setError("Dashboard verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const todoCount = workItems.filter(
    (item) => item.status === "TODO"
  ).length;

  const inProgressCount = workItems.filter(
    (item) => item.status === "IN_PROGRESS"
  ).length;

  const doneCount = workItems.filter(
    (item) => item.status === "DONE"
  ).length;

  const blockedCount = workItems.filter(
    (item) => item.status === "BLOCKED"
  ).length;

  const openRiskCount = risks.filter(
    (risk) => risk.status === "Açık"
  ).length;

  const ongoingRiskCount = risks.filter(
    (risk) => risk.status === "Devam Ediyor"
  ).length;

  const resolvedRiskCount = risks.filter(
    (risk) => risk.status === "Çözüldü"
  ).length;

  function getProjectWorkItems(projectId) {
    return workItems.filter(
      (item) => Number(item.projectId) === Number(projectId)
    );
  }

  function getProjectReports(projectId) {
    return reports.filter(
      (report) => Number(report.projectId) === Number(projectId)
    );
  }

  function getProjectRisks(projectId) {
    return risks.filter(
      (risk) => Number(risk.projectId) === Number(projectId)
    );
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="loading-spinner">⏳</div>
          <h2>Dashboard yükleniyor</h2>
          <p>Veriler hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Başlık */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">
            GENEL BAKIŞ
          </span>

          <h1>Dashboard</h1>

          <p>
            Staj takip sistemindeki genel durumu
            buradan takip edebilirsin.
          </p>
        </div>
      </div>

      {/* Hata */}
      {error && (
        <div className="dashboard-error">
          ❌ {error}
        </div>
      )}

      {/* Genel Özet */}
      <section className="dashboard-section">

        <div className="dashboard-section-title">
          <div>
            <h2>Genel Özet</h2>
            <p>Sistemdeki mevcut kayıtların özeti</p>
          </div>
        </div>

        <div className="dashboard-summary-grid">

          <article className="summary-card">
            <div className="summary-icon">📁</div>

            <div>
              <span>Projeler</span>
              <strong>{projects.length}</strong>
              <small>Toplam proje</small>
            </div>
          </article>

          <article className="summary-card">
            <div className="summary-icon">📝</div>

            <div>
              <span>Haftalık Raporlar</span>
              <strong>{reports.length}</strong>
              <small>Toplam rapor</small>
            </div>
          </article>

          <article className="summary-card">
            <div className="summary-icon">📋</div>

            <div>
              <span>İşler</span>
              <strong>{workItems.length}</strong>
              <small>Toplam iş</small>
            </div>
          </article>

          <article className="summary-card">
            <div className="summary-icon">⚠️</div>

            <div>
              <span>Riskler</span>
              <strong>{risks.length}</strong>
              <small>Toplam risk / engel</small>
            </div>
          </article>

        </div>
      </section>

      {/* İş Durumları */}
      <section className="dashboard-section">

        <div className="dashboard-section-title">
          <div>
            <h2>İş Durumları</h2>
            <p>İşlerin mevcut durumlarına göre dağılımı</p>
          </div>
        </div>

        <div className="status-grid">

          <article className="status-card">
            <span className="status-dot todo"></span>
            <div>
              <span>Bekleyen</span>
              <strong>{todoCount}</strong>
            </div>
          </article>

          <article className="status-card">
            <span className="status-dot progress"></span>
            <div>
              <span>Devam Eden</span>
              <strong>{inProgressCount}</strong>
            </div>
          </article>

          <article className="status-card">
            <span className="status-dot done"></span>
            <div>
              <span>Tamamlanan</span>
              <strong>{doneCount}</strong>
            </div>
          </article>

          <article className="status-card">
            <span className="status-dot blocked"></span>
            <div>
              <span>Engellenen</span>
              <strong>{blockedCount}</strong>
            </div>
          </article>

        </div>
      </section>

      {/* Risk Durumları */}
      <section className="dashboard-section">

        <div className="dashboard-section-title">
          <div>
            <h2>Risk Durumları</h2>
            <p>Risk ve engellerin mevcut durumu</p>
          </div>
        </div>

        <div className="status-grid">

          <article className="status-card">
            <span className="status-dot risk-open"></span>

            <div>
              <span>Açık</span>
              <strong>{openRiskCount}</strong>
            </div>
          </article>

          <article className="status-card">
            <span className="status-dot risk-progress"></span>

            <div>
              <span>Devam Ediyor</span>
              <strong>{ongoingRiskCount}</strong>
            </div>
          </article>

          <article className="status-card">
            <span className="status-dot risk-done"></span>

            <div>
              <span>Çözüldü</span>
              <strong>{resolvedRiskCount}</strong>
            </div>
          </article>

        </div>
      </section>

      {/* Proje Bazlı Özet */}
      <section className="dashboard-section">

        <div className="dashboard-section-title">
          <div>
            <h2>Proje Bazlı Özet</h2>
            <p>
              Her projenin mevcut çalışma durumunu görüntüle
            </p>
          </div>
        </div>

        {projects.length === 0 ? (

          <div className="dashboard-empty">
            <div>📁</div>
            <h3>Henüz proje yok</h3>
            <p>
              Proje eklediğinizde burada özet bilgiler
              görünecek.
            </p>
          </div>

        ) : (

          <div className="project-summary-grid">

            {projects.map((project) => {

              const projectWorkItems =
                getProjectWorkItems(project.id);

              const projectReports =
                getProjectReports(project.id);

              const projectRisks =
                getProjectRisks(project.id);

              const completedItems =
                projectWorkItems.filter(
                  (item) => item.status === "DONE"
                ).length;

              const ongoingItems =
                projectWorkItems.filter(
                  (item) => item.status === "IN_PROGRESS"
                ).length;

              const openRisks =
                projectRisks.filter(
                  (risk) => risk.status === "Açık"
                ).length;

              return (
                <article
                  className="project-summary-card"
                  key={project.id}
                >

                  <div className="project-summary-header">
                    <span>
                      #{project.id}
                    </span>

                    <span className="project-active">
                      Aktif
                    </span>
                  </div>

                  <h3>{project.name}</h3>

                  <p className="project-description">
                    {project.description ||
                      "Bu proje için açıklama eklenmemiş."}
                  </p>

                  <div className="project-stats">

                    <div>
                      <span>İşler</span>
                      <strong>
                        {projectWorkItems.length}
                      </strong>
                    </div>

                    <div>
                      <span>Tamamlanan</span>
                      <strong>
                        {completedItems}
                      </strong>
                    </div>

                    <div>
                      <span>Devam Eden</span>
                      <strong>
                        {ongoingItems}
                      </strong>
                    </div>

                    <div>
                      <span>Raporlar</span>
                      <strong>
                        {projectReports.length}
                      </strong>
                    </div>

                    <div>
                      <span>Riskler</span>
                      <strong>
                        {projectRisks.length}
                      </strong>
                    </div>

                    <div>
                      <span>Açık Risk</span>
                      <strong>
                        {openRisks}
                      </strong>
                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

    </div>
  );
}

export default Dashboard;