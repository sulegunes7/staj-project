import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <header>
        <h2>Staj Projem</h2>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2026 Staj Projem</p>
      </footer>
    </div>
  );
}

export default MainLayout;