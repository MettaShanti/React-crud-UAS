import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function List() {
  // State for Stok
  const [stok, setStok] = useState([]);

  // useEffect to fetch Stok data
  useEffect(() => {
    axios
      .get("https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/stok") // Add the correct API endpoint
      .then((response) => {
        console.log(response);
        setStok(response.data.data); // Adjust based on the actual response
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Function to handle delete with confirmation from SweetAlert2
  const handleDelete = (id, jumlah) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Stok: ${jumlah}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform deletion if confirmed
        axios
          .delete(`https://uas-web-2-git-main-metta-shantis-projects.vercel.app/api/api/stok/${id}`) // Adjust with the correct endpoint
          .then((response) => {
            // Remove the deleted stok from the state
            setStok(stok.filter((data) => data.id !== id));
            // Display success notification
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Handle error
            Swal.fire("Error", "There was an issue deleting the data.", "error");
          });
      }
    });
  };

  return (
    <>
      <h2>List Stok</h2>
      <NavLink to="/stok/create" className="btn btn-primary mb-3">
        Create
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th>Jumlah</th>
            <th>Tanggal Masuk</th>
            <th>Tanggal Expired</th>
            <th>Keterangan</th>
            <th>Nama Barang</th>
            <th>Actions</th> {/* Add column for actions */}
          </tr>
        </thead>
        <tbody>
          {stok.map((data) => (
            <tr key={data.id}>
              <td>{data.jumlah}</td>
              <td>{data.tgl_masuk}</td>
              <td>{data.tgl_expired}</td>
              <td>{data.keterangan}</td>
              <td>{data.barang.nama_barang}</td>
              <td>
                <NavLink
                  to={`/stok/edit/${data.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </NavLink>
                <button
                  onClick={() => handleDelete(data.id, data.jumlah)} // Fixed parameter (data.nama_barang to data.jumlah)
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
