import {Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailObat = () => {
    const { id } = useParams();
    const [obat, setObat] = useState(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        fetch(`http://localhost:3000/api/obat/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setObat(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching obat data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Memuat Detail Obat...</div>;
    if (!obat) return <div>Obat tidak ditemukan.</div>;

    //tampilan
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
    <div className="mb-6">
      <Link
        to="/katalog-obat"
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-md hover:opacity-90 shadow-md transition duration-200"
      >
        Kembali
      </Link>
    </div>

    {/* // Nama Obat */}
    <h1 className="text-3xl font-bold text-white mb-6">
      {obat.nama_obat}
    </h1>

    {/* // Konten Detail Obat */}
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
      
      {/* // Gambar Obat */}
      <div className="flex justify-center mb-6">
        <img
          src={`http://localhost:3000/images/${obat.gambar}`}
          alt={obat.nama_obat}
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* // Info Obat */}
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Kategori:</span> {obat.kategori}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Deskripsi:</span> {obat.deskripsi}
      </p>
      <p className="text-lg font-bold text-green-600">
        Harga: Rp {obat.harga}
      </p>
    </div>
  </div>
);
};

export default DetailObat;