/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";  // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom";  // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios";  // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams();  // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate();  // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [namaKategori, setNamaKategori] = useState("");  // Menginisialisasi state 'namaKategori'
  const [jenis, setJenis] = useState("");  // Menginisialisasi state 'jenis'
  const [deskripsi, setDeskripsi] = useState("");  // Menginisialisasi state 'deskripsi'
  const [status, setStatus] = useState("");  // Menginisialisasi state 'status'

  const [error, setError] = useState(null);  // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data kategori berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori/${id}`) // Mengirimkan request GET untuk mendapatkan data kategori berdasarkan ID
      .then((response) => {
        setNamaKategori(response.data.result.nama_kategori);  // Menyimpan data 'nama_kategori'
        setJenis(response.data.result.jenis);  // Menyimpan data 'jenis'
        setDeskripsi(response.data.result.deskripsi);  // Menyimpan data 'deskripsi'
        setStatus(response.data.result.status);  // Menyimpan data 'status'
      })
      .catch((error) => {
        console.error("Error fetching data:", error);  // Menampilkan pesan error di console jika request gagal
        setError("Data tidak ditemukan");  // Menampilkan pesan error jika data tidak ditemukan
      });
  }, [id]);  // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChangeNamaKategori = (e) => {
    setNamaKategori(e.target.value);  // Mengubah state 'namaKategori' sesuai dengan nilai input
  };

  const handleChangeJenis = (e) => {
    setJenis(e.target.value);  // Mengubah state 'jenis' sesuai dengan nilai input
  };

  const handleChangeDeskripsi = (e) => {
    setDeskripsi(e.target.value);  // Mengubah state 'deskripsi' sesuai dengan nilai input
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);  // Mengubah state 'status' sesuai dengan nilai input
  };

  // Menghandle submit form untuk mengedit data kategori
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori/${id}`, { nama_kategori: namaKategori, jenis, deskripsi, status })  // Mengirimkan request PUT untuk mengupdate data kategori berdasarkan ID
      .then((response) => {
        navigate("/kategori");  // Jika update berhasil, navigasi kembali ke halaman list kategori
      })
      .catch((error) => {
        console.error("Error updating data:", error);  // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data");  // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };

  return (
    <div>
      <h2>Edit Kategori</h2>  {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}  {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>  {/* Form untuk mengedit data kategori */}
        <div className="mb-3">
          <label htmlFor="namaKategori" className="form-label">Nama Kategori</label>  {/* Label untuk input nama kategori */}
          <input
            type="text"
            className="form-control"
            id="namaKategori"
            value={namaKategori}  // Mengisi nilai input dengan state 'namaKategori'
            onChange={handleChangeNamaKategori}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jenis" className="form-label">Jenis</label>  {/* Label untuk input jenis */}
          <input
            type="text"
            className="form-control"
            id="jenis"
            value={jenis}  // Mengisi nilai input dengan state 'jenis'
            onChange={handleChangeJenis}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deskripsi" className="form-label">Deskripsi</label>  {/* Label untuk input deskripsi */}
          <input
            type="text"
            className="form-control"
            id="deskripsi"
            value={deskripsi}  // Mengisi nilai input dengan state 'deskripsi'
            onChange={handleChangeDeskripsi}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>  {/* Label untuk input status */}
          <input
            type="text"
            className="form-control"
            id="status"
            value={status}  // Mengisi nilai input dengan state 'status'
            onChange={handleChangeStatus}  // Mengubah nilai input saat ada perubahan (user mengetik)
            required  // Input wajib diisi
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>  {/* Tombol untuk submit form */}
      </form>
    </div>
  );
}
