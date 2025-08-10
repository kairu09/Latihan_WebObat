import React, { useEffect, useState } from "react";
import axios from "axios";
import { searchObat } from "../utils/search";
import { Link } from "react-router-dom";

const KatalogObat = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  const [obatList, setObatList] = useState([]);
  const [error, setError] = useState(null);
const sortedObatList = [...obatList].sort((a, b) =>
  a.nama_obat.localeCompare(b.nama_obat)
);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/obat")
      .then((response) => setObatList(response.data))
      .catch((error) => {
        console.error("Error fetching obat data:", error);
        setError("Gagal memuat data obat.");
      });
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  const filteredObatList = searchObat(sortedObatList, searchTerm);

 return (
  
  <div className=" bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">Apotek Online</div>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link to="/katalog-obat" className="hover:text-yellow-400">Katalog</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400">Tentang</Link></li>
          <li><Link to="/contact" className="hover:text-yellow-400">Kontak</Link></li>
        </ul>
      </nav>
    {/* // Tombol Kembali */}
    <Link
      to="/"
      className="inline-block mb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-md hover:opacity-90 shadow-md transition duration-200"
    >
      Kembali
    </Link>

    {/* // Judul Halaman */}
    <h1 className="text-3xl font-extrabold text-white mb-6">
      Katalog Obat
    </h1>

    {/* // Fitur Search */}
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari obat..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>

    {/* // Jika data kosong */}
    {filteredObatList.length === 0 && (
      <div className="p-4 text-center text-gray-600 bg-white rounded-lg shadow">
        Tidak ada obat yang ditemukan.
      </div>
    )}

    {/* // Grid Daftar Obat */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredObatList.map((obat) => (
        <Link
          to={`/katalog-obat/${obat.id}`}
          key={obat.id}
          className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          {/* // Kartu Obat */}
          <div className="flex flex-col items-center p-4">
            {/* // Gambar Obat */}
            <img
              src={`http://localhost:3000/images/${obat.gambar}`}
              alt={obat.nama_obat}
              className="w-24 h-24 object-contain mb-3"
            />

            {/* // Nama Obat */}
            <p className="font-semibold text-gray-800 text-center">
              {obat.nama_obat}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
};
export default KatalogObat;
