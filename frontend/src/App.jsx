import { useEffect, useState } from "react";
import { getHealth } from "./services/api";
import "./App.css";

function App() {
  const [health, setHealth] = useState("Kontrol ediliyor...");
  const [error, setError] = useState("");

  useEffect(() => {
    getHealth()
      .then((data) => {
        setHealth(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Staj Projesi</h1>

      <h2>Backend Durumu</h2>

      {error ? (
        <p>❌ {error}</p>
      ) : (
        <p>✅ {health}</p>
      )}
    </div>
  );
}

export default App;