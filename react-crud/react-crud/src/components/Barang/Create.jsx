/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateStok() {
  // Inisialisasi state untuk menyimpan nama barang
  const [kode_barang, setKodeBarang] = useState("");
  const [nama_barang, setNamaBarang] = useState("");
  const [harga_jual, setHargaJual] = useState("");
  const [harga_pokok, setHargaPokok] = useState("");
  const [kategori, setKategori] = useState("");
  const [listKategori, setListKategori] = useState([]); // Daftar kategori barang

  const [error, setError] = useState(""); // Pesan error
  const [success, setSuccess] = useState(""); // Pesan sukses

  // Mengambil daftar kategori dari API saat komponen dimuat
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(
          "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori"
        );
        setListKategori(response.data.data); // Simpan data kategori ke dalam state
      } catch (error) {
        setError("Failed to fetch kategori data");
      }
    };

    fetchKategori(); // Panggil fungsi untuk mengambil data kategori
  }, []); // Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

  // Fungsi yang akan dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum proses
    setSuccess(""); // Reset pesan sukses sebelum proses

    // Validasi input
    if (kode_barang.trim() === "" || kategori.trim() === "") {
      setError("Kode Barang and Kategori are required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (nama_barang.trim() === "") {
      setError("Nama Barang is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (harga_jual.trim() === "") {
      setError("Harga Jual is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (harga_pokok.trim() === "") {
      setError("Harga Pokok is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data barang
      const response = await axios.post(
        "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang", // Endpoint API
        {
          kode_barang: kode_barang,
          nama_barang: nama_barang,
          harga_jual: harga_jual,
          harga_pokok: harga_pokok,
          kategori_id: kategori, // Data kategori yang dipilih
        }
      );
      

      if (response.status === 201) {
        setSuccess("Barang created successfully!");
        setKodeBarang(""); // Kosongkan input form setelah sukses submit
        setNamaBarang("");
        setHargaJual("");
        setHargaPokok("");
        setKategori(""); // Kosongkan dropdown setelah sukses submit
      } else {
        setError("Failed to create Barang");
      }
    } catch (error) {
      setError("An error occurred while creating Barang");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Barang</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Kode Barang</label>
          <input
            type="text"
            className="form-control"
            id="kode_barang"
            value={kode_barang} // Nilai input disimpan di state kodeBarang
            onChange={(e) => setKodeBarang(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kode Barang"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Barang</label>
          <input
            type="text"
            className="form-control"
            id="nama_barang"
            value={nama_barang} // Nilai input disimpan di state namaBarang
            onChange={(e) => setNamaBarang(e.target.value)} // Update state saat input berubah
            placeholder="Enter Nama Barang"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Jual</label>
          <input
            type="number"
            className="form-control"
            id="harga_jual"
            value={harga_jual} // Nilai input disimpan di state hargaJual
            onChange={(e) => setHargaJual(e.target.value)} // Update state saat input berubah
            placeholder="Enter Harga Jual"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Pokok</label>
          <input
            type="number"
            className="form-control"
            id="hargaPokok"
            value={harga_pokok} // Nilai input disimpan di state hargaPokok
            onChange={(e) => setHargaPokok(e.target.value)} // Update state saat input berubah
            placeholder="Enter Harga Pokok"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            id="kategori"
            value={kategori} // Nilai dropdown disimpan di state kategori
            onChange={(e) => setKategori(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">pilih Kategori</option>
            {listKategori.map((kategori) => (
              <option key={kategori.id} value={kategori.id}>
                {kategori.nama_kategori}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
