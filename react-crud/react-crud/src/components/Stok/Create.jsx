/* eslint-disable no-unused-vars */
// src/components/Stok/Create.jsx
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateStok() {
  // Inisialisasi state untuk menyimpan nama prodi
  const [jumlah, setJumlah] = useState("");
  const [tgl_masuk, setTglMasuk] = useState("");
  const [tgl_expired, setTglExpired] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [barang, setBarang] = useState("");
  const [ListBarang, setListBarang] = useState([]);
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");
  // Mengambil daftar fakultas dari API saat komponen dimuat
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await axios.get(
          "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang"
        );
        setListBarang(response.data.data); // Simpan data fakultas ke dalam state
      } catch (error) {
        setError("Failed to fetch barang data");
      }
    };

    fetchBarang(); // Panggil fungsi untuk mengambil data fakultas
  }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input: jika namaProdi atau fakultasId kosong, set pesan error
    if (jumlah.trim() === "" || barang.trim() === "") {
      setError("Jumlah and Id Barang are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tgl_masuk.trim() === "") {
      setError("Tanggal Masuk are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (tgl_expired.trim() === "") {
      setError("Tanggal Expired are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (keterangan.trim() === "") {
      setError("Keterangan are required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data prodi
      const response = await axios.post(
        "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/stok", // Endpoint API yang dituju
        {
          jumlah: jumlah, // Data nama prodi
          tgl_masuk: tgl_masuk,
          tgl_expired: tgl_expired,
          keterangan: keterangan,
          barang_id: barang // Data ID fakultas yang dipilih
        }
      );

      // Jika response HTTP status 201 (Created), berarti berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika prodi berhasil dibuat
        setSuccess("Stok created successfully!");
        setJumlah(""); // Kosongkan input form setelah sukses submit
        setTglMasuk("");
        setTglExpired("");
        setKeterangan("");
        setBarang(""); // Kosongkan dropdown setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create Stok");
      }
    } catch (error) {
      // Jika terjadi error (misal masalah jaringan), tampilkan pesan error
      setError("An error occurred while creating stok");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Stok</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          <label className="form-label">Jumlah</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="number"
            className="form-control"
            id="jumlah"
            value={jumlah} // Nilai input disimpan di state jumlah
            onChange={(e) => setJumlah(e.target.value)} // Update state saat input berubah
            placeholder="Enter jumlah" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Masuk</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tgl_masuk"
            value={tgl_masuk} // Nilai input disimpan di state namaProdi
            onChange={(e) => setTglMasuk(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Masuk" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Expired</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="date"
            className="form-control"
            id="tgl_expired"
            value={tgl_expired} // Nilai input disimpan di state namaProdi
            onChange={(e) => setTglExpired(e.target.value)} // Update state saat input berubah
            placeholder="Enter Tanggal Masuk" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          {/* Input untuk nama prodi dengan class bootstrap */}
          <input
            type="text"
            className="form-control"
            id="keterangan"
            value={keterangan} // Nilai input disimpan di state namaProdi
            onChange={(e) => setKeterangan(e.target.value)} // Update state saat input berubah
            placeholder="Enter keterangan" // Placeholder teks untuk input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Barang</label>
          {/* Dropdown untuk memilih fakultas */}
          <select
            className="form-select"
            id="barang"
            value={barang} // Nilai dropdown disimpan di state fakultasId
            onChange={(e) => setBarang(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Select Barang</option>
            {ListBarang.map((barang) => (
              <option key={barang.id} value={barang.id}>
                {/* Set key dan value untuk masing-masing fakultas */}
                {barang.nama_barang} {/* Nama fakultas sebagai teks di dropdown */}
              </option>
            ))}
          </select>
        </div>
        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
