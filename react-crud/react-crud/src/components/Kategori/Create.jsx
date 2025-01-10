/* eslint-disable no-unused-vars */
// src/components/Kategori/Create.jsx
import React, { useState } from "react"; // Import React dan useState untuk menggunakan state hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateKategori() {
  // Inisialisasi state untuk menyimpan nama fakultas
  const [namaKategori, setNamaKategori] = useState("");
  const [jenis, setJenis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaFakultas kosong, set pesan error
    if (namaKategori.trim() === "") {
      setError("Nama Kategori is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    
    if (jenis.trim() === "") {
      setError("Jenis is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    if (deskripsi.trim() === "") {
        setError("Deskripsi is required"); // Set pesan error jika input kosong
        return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (status.trim() === "") {
      setError("Status is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data fakultas
      const response = await axios.post(
        "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori", // Endpoint API yang dituju
        {
          nama_kategori: namaKategori, // Data yang dikirim berupa objek JSON dengan properti 'nama'
          jenis: jenis,
          deskripsi: deskripsi,
          status: status
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika fakultas berhasil dibuat
        setSuccess("Ketegori created successfully!");
        setNamaKategori(""); // Kosongkan input form setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create kategori");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating kategori");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Kategori</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi nama kategori */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">
            Nama Kategori
          </label>
          {/* Input untuk nama fakultas dengan class bootstrap */}
          <input
            type="text" className="form-control" id="kategori"
            value={namaKategori} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setNamaKategori(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kategori Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Jenis
          </label>
          {/* Input untuk nama nama dekan dengan class bootstrap */}
          <input
            type="text" className="form-control" id="jenis"
            value={jenis} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setJenis(e.target.value)} // Update state saat input berubah
            placeholder="Enter jenis Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Deskripsi
          </label>
          {/* Input untuk nama fakultas dengan class bootstrap */}
          <input
            type="text" className="form-control" id="deskripsi"
            value={deskripsi} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setDeskripsi(e.target.value)} // Update state saat input berubah
            placeholder="Enter deskripsi Name" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Status
          </label>
          {/* Input untuk nama fakultas dengan class bootstrap */}
          <input
            type="text" className="form-control" id="status"
            value={status} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setStatus(e.target.value)} // Update state saat input berubah
            placeholder="Enter Status Name" // Placeholder teks untuk input
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
  }
