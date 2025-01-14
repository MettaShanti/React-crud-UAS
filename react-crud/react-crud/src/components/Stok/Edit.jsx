/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [jumlah, setJumlah] = useState("");
  const [tgl_masuk, setTglMasuk] = useState("");
  const [tgl_expired, setTglExpired] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [barang, setBarang] = useState("");
  const [ListBarang, setListBarang] = useState([]);
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data prodi berdasarkan ID
    axios
      .get(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/stok/${id}`)
      .then((response) => {
        setJumlah(response.data.result.jumlah); // Menyimpan nama prodi ke dalam state 'nama'
        setTglMasuk(response.data.result.tgl_masuk);
        setTglExpired(response.data.result.tgl_expired);
        setKeterangan(response.data.result.keterangan);
        setBarang(response.data.result.barang_id); // Menyimpan ID fakultas ke dalam state 'fakultas'
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

    // Mengambil data fakultas untuk dropdown
    axios
      .get("https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/barang") // Request ke API fakultas
      .then((response) => {
        setListBarang(response.data.data); // Menyimpan daftar fakultas ke dalam state 'listFakultas'
      })
      .catch((error) => {
        console.error("Error fetching stok data:", error); // Menangani error jika request gagal
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setJumlah(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeTglMasuk = (e) => {
    setTglMasuk(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeTglExpired = (e) => {
    setTglExpired(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  const handleChangeKeterangan = (e) => {
    setKeterangan(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };
  // Menghandle perubahan dropdown fakultas
  const handleBarangChange = (e) => {
    setBarang(e.target.value); // Mengubah state 'fakultas' sesuai dengan pilihan yang dipilih pengguna di dropdown
  };
  // Menghandle submit form untuk mengedit data prodi
  const handleSubmit = (e) => {
    e.preventDefault();  // Mencegah reload halaman saat form disubmit
    axios
      .put(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/stok/${id}`, { jumlah, tgl_masuk, tgl_expired, keterangan, barang_id : barang })  // Mengirimkan request PATCH untuk mengupdate data fakultas berdasarkan ID
      .then((response) => {
        navigate("/stok");  // Jika update berhasil, navigasi kembali ke halaman list fakultas
      })
      .catch((error) => {
        console.error("Error updating data:", error);  // Menampilkan error di console jika ada kesalahan
        setError("Gagal mengupdate data");  // Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };
 
  return (
    <div>
      <h2>Edit Stok</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          <label htmlFor="jumlah" className="form-label">
            Jumlah
          </label> {/* Label untuk input nama prodi */}
          <input
            type="number" className="form-control" id="jumlah" value={jumlah} // Mengisi nilai input dengan state 'nama'
            onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tgl_masuk" className="form-label">
          Tanggal Masuk
          </label> {/* Label untuk input nama prodi */}
          <input
            type="date" className="form-control" id="tgl_masuk" value={tgl_masuk} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeTglMasuk} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tgl_expired" className="form-label">
          Tanggal Expired
          </label> {/* Label untuk input nama prodi */}
          <input
            type="date" className="form-control" id="tgl_expired" value={tgl_expired} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeTglExpired} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keterangan" className="form-label">
          Keterangan
          </label> {/* Label untuk input nama prodi */}
          <input
            type="text" className="form-control" id="keterangan" value={keterangan} // Mengisi nilai input dengan state 'nama'
            onChange={handleChangeKeterangan} // Mengubah nilai input saat ada perubahan (user mengetik)
            required // Input wajib diisi
          />
        </div>
        <div className="mb-3 ms-3">
          <label htmlFor="barang" className="form-label">
            Barang
          </label> {/* Label untuk dropdown dokter */}
          <select
            className="form-select" id="barang" value={barang} // Mengisi nilai dropdown dengan state 'dokter'
            onChange={handleBarangChange} // Mengubah nilai dropdown saat pengguna memilih dokter
            required // Dropdown wajib dipilih
          >
            <option value="">Pilih barang</option> {/* Default option untuk dropdown */}
            {ListBarang.map(
              // Melakukan mapping dari daftar dokter untuk menampilkan setiap dokter sebagai opsi
              (data) => (
                <option key={data.id} value={data.id}>
                  {data.nama_barang} {/* Menampilkan nama dokter */}
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