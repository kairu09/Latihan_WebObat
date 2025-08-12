import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllObat, deleteObat } from '../services/api';
import ObatForm from '../components/ObatForm';
import Notification from '../components/Notification';
import ConfirmModal from '../components/ConfirmModal';

const AdminObat = ({ onLogout }) => {
    const [obatList, setObatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        obatId: null,
        obatName: ''
    });
    const [notification, setNotification] = useState({
        isVisible: false,
        message: '',
        type: 'success'
    });
    const navigate = useNavigate();

    useEffect(() => {
        loadObatList();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({
            isVisible: true,
            message,
            type
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        onLogout(false);
        navigate('/admin/login');
    };

    const loadObatList = async () => {
        try {
            setLoading(true);
            const data = await getAllObat();
            setObatList(data);
        } catch (error) {
            console.error('Error loading obat:', error);
            showNotification('Gagal memuat data obat', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        const obat = obatList.find(o => o.id === id);
        setDeleteModal({
            isOpen: true,
            obatId: id,
            obatName: obat?.nama_obat || 'Obat'
        });
    };

    const confirmDelete = async () => {
        try {
            await deleteObat(deleteModal.obatId);
            showNotification('Obat berhasil dihapus');
            loadObatList();
        } catch (error) {
            console.error('Error deleting obat:', error);
            showNotification('Gagal menghapus obat', 'error');
        } finally {
            setDeleteModal({ isOpen: false, obatId: null, obatName: '' });
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ isOpen: false, obatId: null, obatName: '' });
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
        const message = editingId ? 'Obat berhasil diperbarui' : 'Obat berhasil ditambahkan';
        showNotification(message);
        loadObatList();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingId(null);
    };

    if (showForm) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">Admin Panel - Kelola Obat</h1>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-blue-600 hover:text-blue-800">
                                Lihat Website
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Form Content */}
                <div className="container mx-auto px-4 py-8">
                    <ObatForm
                        obatId={editingId}
                        onSuccess={handleFormSuccess}
                        onCancel={handleFormCancel}
                    />
                </div>
            </div>
        );
    }

    // Filter obat based on search term
    const filteredObatList = obatList.filter(obat =>
        obat.nama_obat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obat.kategori?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Notification 
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
            />
            
            <ConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Konfirmasi Hapus"
                message="Apakah Anda yakin ingin menghapus obat"
                itemName={deleteModal.obatName}
            />
            
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel - Kelola Obat</h1>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-blue-600 hover:text-blue-800">
                            Lihat Website
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Action Bar */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Daftar Obat</h2>
                            <p className="text-gray-600">Total: {obatList.length} obat</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Cari obat atau kategori..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            
                            {/* Add Button */}
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah Obat
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                {loading ? (
                    <div className="bg-white rounded-lg shadow p-8">
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2">Loading...</p>
                        </div>
                    </div>
                ) : filteredObatList.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8">
                        <div className="text-center py-8">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-5 5-4-4-3 3" />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                {searchTerm ? 'Tidak ada obat yang sesuai dengan pencarian' : 'Belum ada data obat'}
                            </p>
                            {!searchTerm && (
                                <p className="text-gray-400 mt-2">Tambahkan obat pertama untuk memulai!</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gambar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Obat
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredObatList.map((obat) => (
                                        <tr key={obat.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {obat.gambar ? (
                                                    <img
                                                        src={`http://localhost:3000/images/${obat.gambar}`}
                                                        alt={obat.nama_obat}
                                                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {obat.nama_obat}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-semibold">
                                                    Rp {Number(obat.harga)?.toLocaleString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {obat.kategori}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate" title={obat.deskripsi}>
                                                    {obat.deskripsi}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(obat.id)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(obat.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminObat;