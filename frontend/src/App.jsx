import { useState } from "react";
import Home from "./pages/Home";
import WeeklyReports from "./pages/WeeklyReports";
import WorkItems from "./pages/WorkItems";
import Risks from "./pages/Risks";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <h2>Staj Takip Sistemi</h2>

          <div className="nav-buttons">
            <button
              className={page === "dashboard" ? "active" : ""}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={page === "projects" ? "active" : ""}
              onClick={() => setPage("projects")}
            >
              Projeler
            </button>

            <button
              className={page === "reports" ? "active" : ""}
              onClick={() => setPage("reports")}
            >
              Haftalık Raporlar
            </button>

            <button
              className={page === "work-items" ? "active" : ""}
              onClick={() => setPage("work-items")}
            >
              İşler
            </button>

            <button
              className={page === "risks" ? "active" : ""}
              onClick={() => setPage("risks")}
            >
              Riskler
            </button>
          </div>
        </div>
      </nav>

      <main className="container">
        {page === "dashboard" && <Dashboard />}

        {page === "projects" && <Home />}

        {page === "reports" && <WeeklyReports />}

        {page === "work-items" && <WorkItems />}

        {page === "risks" && <Risks />}
      </main>
    </div>
  );
}

export default App;