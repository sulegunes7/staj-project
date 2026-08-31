import { useState } from "react";
import Home from "./pages/Home";
import WeeklyReports from "./pages/WeeklyReports";
import "./App.css";

function App() {
  const [page, setPage] = useState("projects");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-inner">
          <h2>Staj Takip Sistemi</h2>

          <div className="nav-buttons">
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
          </div>
        </div>
      </nav>

      <main className="container">
        {page === "projects" && <Home />}

        {page === "reports" && <WeeklyReports />}
      </main>
    </div>
  );
}

export default App;