import React,{useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function List(){
    //state prodi
    const [kategori, setKategori] = useState([]);

    //akses api
    useEffect( () => {
        axios
        .get("https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori")
        .then( (response)=> {
            console.log(response);
            setKategori(response.data.data)// reault diganti(disesuaikan inspect)
        })
    }, [])
// Fungsi untuk menghapus fakultas berdasarkan ID dengan konfirmasi SweetAlert2
const handleDelete = (id, nama_ketegori) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Kategori: ${nama_ketegori}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan jika dikonfirmasi
        axios
          .delete(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/kategori/${id}`)
          .then((response) => {
            // Hapus fakultas dari state setelah sukses dihapus dari server
            setKategori(kategori.filter((data) => data.id !== id));
            // Tampilkan notifikasi sukses
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };
    return(
        <>
            <h2>List Kategori</h2>
            <NavLink to="/kategori/create" className="btn btn-primary mb-3">Create</NavLink>
            <table className="table">
                <thead>
                    <tr>
                    <th>Nama Kategori</th>
                    <th>Jenis</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {kategori.map( (data) => (
                        <tr key={data.id}>
                        <td>{data.nama_kategori}</td>
                        <td>{data.jenis}</td>
                        <td>{data.deskripsi}</td>
                        <td>{data.status}</td>
                        <td>
                        <NavLink to={`/kategori/edit/${data.id}`}
                            className="btn btn-warning">Edit
                        </NavLink>
                        <button onClick={() => handleDelete(data.id, data.nama_barang)}
                            className="btn btn-danger"> Delete
                        </button>
                        </td>
                    </tr>
                    ) )}
                </tbody>
            </table>
        </>
    )
}