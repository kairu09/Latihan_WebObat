import React, { useState, useEffect } from 'react';
import { getAllObat, deleteObat } from '../services/api';
import ObatForm from '../components/ObatForm';

const AdminObat = () => {
    const [obatList, setObatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadObatList();
    }, []);

    const loadObatList = async () => {
        try {
            setLoading(true);
            const data = await getAllObat();
            setObatList(data);
        } catch (error) {
            console.error('Error loading obat:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus obat ini?')) {
            try {
                await deleteObat(id);
                loadObatList();
            } catch (error) {
                console.error('Error deleting obat:', error);
                alert('Error deleting obat: ' + error.message);
            }
        }
    };

    const handleEdit = (id) => {
        setEditingId(id);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingId(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingId(null);
        loadObatList();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingId(null);
    };

    if (showForm) {
        return (
            <ObatForm
                obatId={editingId}
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin - Kelola Obat</h1>
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                >
                    Tambah Obat
                </button>
            </div>

            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gambar
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Harga
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stok
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {obatList.map((obat) => (
                                <tr key={obat.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {obat.gambar && (
                                            <img
                                                src={`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${obat.gambar}`}
                                                alt={obat.nama}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {obat.nama}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            Rp {obat.harga?.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {obat.stok}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {obat.kategori}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(obat.id)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(obat.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminObat;