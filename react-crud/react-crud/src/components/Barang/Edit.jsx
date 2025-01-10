/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios"; 

export default function Edit() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [hargaPokok, setHargaPokok] = useState("");
  const [kategori, setKategori] = useState("");
  const [listKatagori, setListKategori] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data for the specific Barang by ID
    axios
      .get(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang/${id}`)
      .then((response) => {
        const data = response.data.result;
        setKodeBarang(data.kodeBarang);
        setNamaBarang(data.namaBarang);
        setHargaJual(data.hargaJual);
        setHargaPokok(data.hargaPokok);
        setKategori(data.kategori.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Data tidak ditemukan");
      });

    // Fetching categories for the dropdown
    axios
      .get("https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori")
      .then((response) => {
        setListKategori(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching kategori data:", error);
      });
  }, [id]);

  // Handle input changes for form fields
  const handleKodeBarangChange = (e) => {
    setKodeBarang(e.target.value);
  };

  const handleNamaBarangChange = (e) => {
    setNamaBarang(e.target.value);
  };

  const handleHargaJualChange = (e) => {
    setHargaJual(e.target.value);
  };

  const handleHargaPokokChange = (e) => {
    setHargaPokok(e.target.value);
  };

  const handleKategoriChange = (e) => {
    setKategori(e.target.value);
  };

  // Submit form to update Barang data
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      kodeBarang,
      namaBarang,
      hargaJual,
      hargaPokok,
      kategori_id: kategori,
    };

    axios
      .patch(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang/${id}`, updatedData)
      .then(() => {
        navigate("/barang");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setError("Gagal mengupdate data");
      });
  };

  return (
    <div>
      <h2>Edit Barang</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="kodeBarang" className="form-label">
            Kode Barang
          </label>
          <input
            type="text"
            className="form-control"
            id="kodeBarang"
            value={kodeBarang}
            onChange={handleKodeBarangChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="namaBarang" className="form-label">
            Nama Barang
          </label>
          <input
            type="text"
            className="form-control"
            id="namaBarang"
            value={namaBarang}
            onChange={handleNamaBarangChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hargaJual" className="form-label">
            Harga Jual
          </label>
          <input
            type="number"
            className="form-control"
            id="hargaJual"
            value={hargaJual}
            onChange={handleHargaJualChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hargaPokok" className="form-label">
            Harga Pokok
          </label>
          <input
            type="number"
            className="form-control"
            id="hargaPokok"
            value={hargaPokok}
            onChange={handleHargaPokokChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kategori" className="form-label">
            Kategori
          </label>
          <select
            className="form-select"
            id="kategori"
            value={kategori}
            onChange={handleKategoriChange}
            required
          >
            <option value="">Pilih Kategori</option>
            {listKatagori.map((data) => (
              <option key={data.id} value={data.id}>
                {data.nama_kategori}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
