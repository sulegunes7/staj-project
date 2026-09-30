import { useState } from "react";
import { setAuth } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      setAuth(username, password);

      const response = await fetch(
        "http://localhost:8080/api/work-items",
        {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
        }
      );

      if (response.status === 401) {
        throw new Error("Kullanıcı adı veya şifre hatalı.");
      }

      if (!response.ok) {
        throw new Error("Giriş yapılamadı.");
      }

      window.location.href = "/dashboard";
    } catch (error) {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userRole");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h1>Giriş Yap</h1>

        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

export default Login;