import React, {Suspense, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute Component
import Logout from "./components/Logout";

const Home = React.lazy( () => import("./components/Home"))
const BarangList = React.lazy( () => import("./components/Barang/List"))
const KategoriList = React.lazy( () => import("./components/Kategori/List"))
const StokList = React.lazy( () => import("./components/Stok/List"))

//barang
const BarangCreate = React.lazy( () => import("./components/Barang/Create"))
const BarangEdit = React.lazy( () => import("./components/Barang/Edit"))
// kategori
const KategoriEdit = React.lazy( () => import("./components/Kategori/Edit"))
const KategoriCreate = React.lazy( () => import("./components/Kategori/Create"))
//stok
const StokCreate = React.lazy( () => import("./components/Stok/Create"))
const StokEdit = React.lazy( () => import("./components/Stok/Edit"))

// login
const Login = React.lazy(() => import("./components/Login"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">React APP Iventory Barang</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">HOME</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/barang" className="nav-link">Barang</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/kategori" className="nav-link">Kategori</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/stok" className="nav-link">Stok</NavLink>
        </li>
        <li className="nav-item">
                {token ? (
                  <NavLink className="nav-link px-3" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link px-3" to="/login">
                    Login
                  </NavLink>
                )}
          </li>
      </ul>
    </div>
  </div>
</nav>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout />} />

        <Route path='/barang' element={
          <ProtectedRoute>
          <BarangList/>
        </ProtectedRoute>
        }/>
        <Route path='/barang/create' 
        element={
          <ProtectedRoute>
            <BarangCreate/>
          </ProtectedRoute>
        }/>
        <Route path='/barang/edit/:id' 
        element={
          <ProtectedRoute>
            <BarangEdit/>
          </ProtectedRoute>
        }/>

        <Route path='/kategori' 
        element={
          <ProtectedRoute>
            <KategoriList/>
          </ProtectedRoute>
        }/>

        <Route path='/kategori/create' 
        element={
          <ProtectedRoute>
            <KategoriCreate/>
          </ProtectedRoute>
        }/>
        <Route path='/kategori/edit/:id' 
        element={<ProtectedRoute>
          <KategoriEdit/>
        </ProtectedRoute>
      }/>

        <Route path='/stok' element={
          <ProtectedRoute>
          <StokList/>
        </ProtectedRoute>
        }/>
        <Route path='/stok/create'
         element={
          <ProtectedRoute>
            <StokCreate/>
          </ProtectedRoute>
         }/>
        <Route path='/stok/edit/:id' 
        element={
          <ProtectedRoute>
            <StokEdit/>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App
