import React, { useState, useEffect } from 'react';
import { createObat, updateObat, getObatById } from '../services/api';

const ObatForm = ({ obatId, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        nama: '',
        harga: '',
        deskripsi: '',
        stok: '',
        kategori: '',
        gambar: null
    });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const isEdit = !!obatId;

    useEffect(() => {
        if (isEdit) {
            loadObatData();
        }
    }, [obatId]);

    const loadObatData = async () => {
        try {
            const obat = await getObatById(obatId);
            setFormData({
                nama: obat.nama || '',
                harga: obat.harga || '',
                deskripsi: obat.deskripsi || '',
                stok: obat.stok || '',
                kategori: obat.kategori || '',
                gambar: null
            });
            if (obat.gambar) {
                setPreview(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/images/${obat.gambar}`);
            }
        } catch (error) {
            console.error('Error loading obat:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'gambar') {
            const file = files[0];
            setFormData(prev => ({ ...prev, gambar: file }));
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    submitData.append(key, formData[key]);
                }
            });

            if (isEdit) {
                await updateObat(obatId, submitData);
            } else {
                await createObat(submitData);
            }
            
            onSuccess();
        } catch (error) {
            console.error('Error saving obat:', error);
            alert('Error saving obat: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
                {isEdit ? 'Edit Obat' : 'Tambah Obat Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Obat
                    </label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harga
                    </label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stok
                    </label>
                    <input
                        type="number"
                        name="stok"
                        value={formData.stok}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori
                    </label>
                    <input
                        type="text"
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                    </label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gambar
                    </label>
                    <input
                        type="file"
                        name="gambar"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-md"
                        />
                    )}
                </div>

                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ObatForm;