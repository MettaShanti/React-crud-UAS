/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Import React dan hooks
import axios from "axios"; // Import axios untuk melakukan HTTP request

export default function CreateStok() {
  // Inisialisasi state untuk menyimpan nama barang
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [hargaPokok, setHargaPokok] = useState("");
  const [kategoriId, setKategoriId] = useState("");
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
    if (kodeBarang.trim() === "" || kategoriId.trim() === "") {
      setError("Kode Barang and Kategori are required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (namaBarang.trim() === "") {
      setError("Nama Barang is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (hargaJual.trim() === "") {
      setError("Harga Jual is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }
    if (hargaPokok.trim() === "") {
      setError("Harga Pokok is required");
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP POST request untuk menyimpan data barang
      const response = await axios.post(
        "https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang", // Endpoint API
        {
          kode_barang: kodeBarang,
          nama_barang: namaBarang,
          harga_jual: hargaJual,
          harga_pokok: hargaPokok,
          kategori_id: kategoriId, // Data kategori yang dipilih
        }
      );

      if (response.status === 201) {
        setSuccess("Barang created successfully!");
        setKodeBarang(""); // Kosongkan input form setelah sukses submit
        setNamaBarang("");
        setHargaJual("");
        setHargaPokok("");
        setKategoriId(""); // Kosongkan dropdown setelah sukses submit
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
            id="kodeBarang"
            value={kodeBarang} // Nilai input disimpan di state kodeBarang
            onChange={(e) => setKodeBarang(e.target.value)} // Update state saat input berubah
            placeholder="Enter Kode Barang"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nama Barang</label>
          <input
            type="text"
            className="form-control"
            id="namaBarang"
            value={namaBarang} // Nilai input disimpan di state namaBarang
            onChange={(e) => setNamaBarang(e.target.value)} // Update state saat input berubah
            placeholder="Enter Nama Barang"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Jual</label>
          <input
            type="number"
            className="form-control"
            id="hargaJual"
            value={hargaJual} // Nilai input disimpan di state hargaJual
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
            value={hargaPokok} // Nilai input disimpan di state hargaPokok
            onChange={(e) => setHargaPokok(e.target.value)} // Update state saat input berubah
            placeholder="Enter Harga Pokok"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            id="kategoriId"
            value={kategoriId} // Nilai dropdown disimpan di state kategoriId
            onChange={(e) => setKategoriId(e.target.value)} // Update state saat pilihan berubah
          >
            <option value="">Select Kategori</option>
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
