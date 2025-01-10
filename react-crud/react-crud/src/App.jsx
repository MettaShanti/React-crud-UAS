import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink} from "react-router-dom"
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
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken")); // Ambil token dari localStorage
function App() {
 
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
        <li>
                {token ? ( // Tampilkan Logout jika token ada
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
      </ul>
    </div>
  </div>
</nav>
      <h1>React CRUD</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/barang' element={<BarangList/>}/>
        <Route path='/barang/create' element={<BarangCreate/>}/>
        <Route path='/barang/edit/:id' element={<BarangEdit/>}/>

        <Route path='/kategori' element={<KategoriList/>}/>
        <Route path='/kategori/create' element={<KategoriCreate/>}/>
        <Route path='/kategori/edit/:id' element={<KategoriEdit/>}/>

        <Route path='/stok' element={<StokList/>}/>
        <Route path='/stok/create' element={<StokCreate/>}/>
        <Route path='/stok/edit/:id' element={<StokEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App
