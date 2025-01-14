/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [kode_barang, setKodeBarang] = useState("");
  const [nama_barang, setNamaBarang] = useState("");
  const [harga_jual, setHargaJual] = useState("");
  const [harga_pokok, setHargaPokok] = useState("");
  const [kategori, setKategori] = useState("");
  const [listKategori, setListKategori] = useState([]); // Daftar kategori barang
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data prodi berdasarkan ID
    axios
      .get(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang/${id}`)
      .then((response) => {
        setKodeBarang(response.data.result.kode_barang); // Menyimpan nama prodi ke dalam state 'nama'
        setNamaBarang(response.data.result.nama_barang);
        setHargaJual(response.data.result.harga_jual);
        setHargaPokok(response.data.result.harga_pokok);
        setKategori(response.data.result.kategori_id); // Menyimpan ID fakultas ke dalam state 'fakultas'
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data fakultas untuk dropdown
    axios
      .get("https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori") // Request ke API fakultas
      .then((response) => {
        setListKategori(response.data.data); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
      })
      .catch((error) => {
        console.error("Error fetching kategori data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setKodeBarang(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeNamaBarang = (e) => {
    setNamaBarang(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeHargaJual = (e) => {
    setHargaJual(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeHargaPokok = (e) => {
    setHargaPokok(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  // Menghandle perubahan dropdown fakultas
  const handleKategoriChange = (e) => {
    setKategori(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };
  // Menghandle submit form untuk mengedit data prodi
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    axios
  .patch(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang/${id}`, {
    kode_barang,
    nama_barang,
    harga_jual,
    harga_pokok,
    kategori_id: kategori, // Pastikan nama field sesuai dengan yang diterima API
  })
  .then((response) => {
    navigate("/barang"); // Redirect setelah berhasil
  })
  .catch((error) => {
    console.error("Error updating data:", error);
    setError("Gagal mengupdate data");
  });

  };
 
  return (
    <div>
      <h2>Edit Barang</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="kode_barang" className="form-label">
            Kode Barang
          </label> {/* Label untuk input nama prodi */}
          <input
            type="number" className="form-control" id="kode_barang" value={kode_barang} // Mengisi nilai input dengan state 'nama'
            onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama_barang" className="form-label">
            Nama Barang
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="nama_barang" value={nama_barang} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeNamaBarang} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="harga_jual" className="form-label">
            Harga Jual
          </label> {/* Label untuk input nama prodi */}
          <input
            type="number" className="form-control" id="harga_jual" value={harga_jual} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeHargaJual} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="harga_pokok" className="form-label">
            Harga Pokok
          </label> {/* Label untuk input nama prodi */}
          <input
            type="number" className="form-control" id="harga_pokok" value={harga_pokok} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeHargaPokok} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="kategori" className="form-label">
            Kategori
          </label> {/* Label untuk dropdown dokter */}
          <select
            className="form-select" id="kategori" value={kategori} // Mengisi nilai dropdown dengan state 'dokter'
            onChange={handleKategoriChange} // Mengubah nilai dropdown saat pengguna memilih dokter
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih kategori</option> {/* Default option untuk dropdown */}
            {listKategori.map(
              // Melakukan mapping dari daftar dokter untuk menampilkan setiap dokter sebagai opsi
              (data) => (
                <option key={data.id} value={data.id}>
                  {data.nama_kategori} {/* Menampilkan nama dokter */}
                </option>
              )
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>{" "}
        {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}