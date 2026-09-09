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
      <div className="home-page">
        <div className="empty-state">
          <p>Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">
            Staj takip sistemindeki genel durumu buradan takip et.
          </p>
        </div>
      </div>

      {error && (
        <div className="message error-message">
          ❌ {error}
        </div>
      )}

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>Genel Özet</h2>
            <p>Sistemdeki mevcut kayıtların özeti</p>
          </div>
        </div>

        <div className="project-grid">
          <article className="project-card">
            <div className="project-card-top">
              <span className="project-number">📁</span>
            </div>

            <h3>Projeler</h3>
            <p className="dashboard-number">
              {projects.length}
            </p>
            <p>Toplam proje</p>
          </article>

          <article className="project-card">
            <div className="project-card-top">
              <span className="project-number">📝</span>
            </div>

            <h3>Haftalık Raporlar</h3>
            <p className="dashboard-number">
              {reports.length}
            </p>
            <p>Toplam haftalık rapor</p>
          </article>

          <article className="project-card">
            <div className="project-card-top">
              <span className="project-number">📋</span>
            </div>

            <h3>İşler</h3>
            <p className="dashboard-number">
              {workItems.length}
            </p>
            <p>Toplam iş</p>
          </article>

          <article className="project-card">
            <div className="project-card-top">
              <span className="project-number">⚠️</span>
            </div>

            <h3>Riskler</h3>
            <p className="dashboard-number">
              {risks.length}
            </p>
            <p>Toplam risk / engel</p>
          </article>
        </div>
      </section>

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>İş Durumları</h2>
            <p>İşlerin mevcut durumlarına göre dağılımı</p>
          </div>
        </div>

        <div className="project-grid">
          <article className="project-card">
            <h3>Bekleyen</h3>
            <p className="dashboard-number">
              {todoCount}
            </p>
          </article>

          <article className="project-card">
            <h3>Devam Eden</h3>
            <p className="dashboard-number">
              {inProgressCount}
            </p>
          </article>

          <article className="project-card">
            <h3>Tamamlanan</h3>
            <p className="dashboard-number">
              {doneCount}
            </p>
          </article>

          <article className="project-card">
            <h3>Engellenen</h3>
            <p className="dashboard-number">
              {blockedCount}
            </p>
          </article>
        </div>
      </section>

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>Risk Durumları</h2>
            <p>Risk ve engellerin mevcut durumu</p>
          </div>
        </div>

        <div className="project-grid">
          <article className="project-card">
            <h3>Açık</h3>
            <p className="dashboard-number">
              {openRiskCount}
            </p>
          </article>

          <article className="project-card">
            <h3>Devam Ediyor</h3>
            <p className="dashboard-number">
              {ongoingRiskCount}
            </p>
          </article>

          <article className="project-card">
            <h3>Çözüldü</h3>
            <p className="dashboard-number">
              {resolvedRiskCount}
            </p>
          </article>
        </div>
      </section>

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>Proje Bazlı Özet</h2>
            <p>Her projenin mevcut çalışma durumunu görüntüle</p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>Henüz proje yok</h3>
            <p>Proje eklediğinizde burada özet bilgiler görünecek.</p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => {
              const projectWorkItems = getProjectWorkItems(project.id);
              const projectReports = getProjectReports(project.id);
              const projectRisks = getProjectRisks(project.id);

              const completedItems = projectWorkItems.filter(
                (item) => item.status === "DONE"
              ).length;

              const ongoingItems = projectWorkItems.filter(
                (item) => item.status === "IN_PROGRESS"
              ).length;

              const openRisks = projectRisks.filter(
                (risk) => risk.status === "Açık"
              ).length;

              return (
                <article
                  className="project-card"
                  key={project.id}
                >
                  <div className="project-card-top">
                    <span className="project-number">
                      #{project.id}
                    </span>
                  </div>

                  <h3>{project.name}</h3>

                  <p>
                    {project.description ||
                      "Bu proje için açıklama eklenmemiş."}
                  </p>

                  <p>
                    <strong>İşler:</strong>{" "}
                    {projectWorkItems.length}
                  </p>

                  <p>
                    <strong>Tamamlanan işler:</strong>{" "}
                    {completedItems}
                  </p>

                  <p>
                    <strong>Devam eden işler:</strong>{" "}
                    {ongoingItems}
                  </p>

                  <p>
                    <strong>Haftalık raporlar:</strong>{" "}
                    {projectReports.length}
                  </p>

                  <p>
                    <strong>Riskler:</strong>{" "}
                    {projectRisks.length}
                  </p>

                  <p>
                    <strong>Açık riskler:</strong>{" "}
                    {openRisks}
                  </p>
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