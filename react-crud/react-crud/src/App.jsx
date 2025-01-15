import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import Logout from "./components/Logout";

// Lazy-loaded components
const Home = React.lazy(() => import("./components/Home"));
const BarangList = React.lazy(() => import("./components/Barang/List"));
const KategoriList = React.lazy(() => import("./components/Kategori/List"));
const StokList = React.lazy(() => import("./components/Stok/List"));
const BarangCreate = React.lazy(() => import("./components/Barang/Create"));
const BarangEdit = React.lazy(() => import("./components/Barang/Edit"));
const KategoriCreate = React.lazy(() => import("./components/Kategori/Create"));
const KategoriEdit = React.lazy(() => import("./components/Kategori/Edit"));
const StokCreate = React.lazy(() => import("./components/Stok/Create"));
const StokEdit = React.lazy(() => import("./components/Stok/Edit"));
const Login = React.lazy(() => import("./components/Login"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Token dari localStorage

  return (
    <Router>
      {/* Layout */}
      <div className="d-flex flex-column vh-100" style={{ backgroundColor: "#e6f7ff" }}>
        {/* Sidebar */}
        <div className="d-flex">
          <nav className="d-flex flex-column text-white p-3" style={{ width: "250px", backgroundColor: "#003366" }}>
            <h4 className="text-center mb-4">React Inventory</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  <i className="bi bi-house-door me-2"></i>Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/barang" className="nav-link text-white">
                  <i className="bi bi-box-seam me-2"></i>Barang
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/kategori" className="nav-link text-white">
                  <i className="bi bi-grid me-2"></i>Kategori
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/stok" className="nav-link text-white">
                  <i className="bi bi-stack me-2"></i>Stok
                </NavLink>
              </li>
              <li className="nav-item mt-3">
                {token ? (
                  <NavLink className="btn btn-light text-dark w-100" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="btn btn-light text-dark w-100" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-grow-1">
            {/* Header */}
            <header
              className="py-3 px-4"
              style={{ backgroundColor: "#004080", color: "white", borderBottom: "2px solid #003366" }}
            >
              <h5 className="m-0">Welcome to React Inventory App</h5>
            </header>

            {/* Main Content */}
            <main className="p-4">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login setToken={setToken} />} />
                  <Route path="/logout" element={<Logout />} />

                  {/* Barang Routes */}
                  <Route path="/barang" element={<ProtectedRoute><BarangList /></ProtectedRoute>} />
                  <Route path="/barang/create" element={<ProtectedRoute><BarangCreate /></ProtectedRoute>} />
                  <Route path="/barang/edit/:id" element={<ProtectedRoute><BarangEdit /></ProtectedRoute>} />

                  {/* Kategori Routes */}
                  <Route path="/kategori" element={<ProtectedRoute><KategoriList /></ProtectedRoute>} />
                  <Route path="/kategori/create" element={<ProtectedRoute><KategoriCreate /></ProtectedRoute>} />
                  <Route path="/kategori/edit/:id" element={<ProtectedRoute><KategoriEdit /></ProtectedRoute>} />

                  {/* Stok Routes */}
                  <Route path="/stok" element={<ProtectedRoute><StokList /></ProtectedRoute>} />
                  <Route path="/stok/create" element={<ProtectedRoute><StokCreate /></ProtectedRoute>} />
                  <Route path="/stok/edit/:id" element={<ProtectedRoute><StokEdit /></ProtectedRoute>} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
