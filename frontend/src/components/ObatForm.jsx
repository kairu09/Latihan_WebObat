import React, { useState, useEffect } from 'react';
import { createObat, updateObat, getObatById } from '../services/api';

const ObatForm = ({ obatId, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        nama_obat: '',
        harga: '',
        deskripsi: '',
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
                nama_obat: obat.nama_obat || '',
                harga: obat.harga || '',
                deskripsi: obat.deskripsi || '',
                kategori: obat.kategori || '',
                gambar: null
            });
            if (obat.gambar) {
                setPreview(`http://localhost:3000/images/${obat.gambar}`);
            }
        } catch (error) {
            console.error('Error loading obat:', error);
            alert('Error loading obat: ' + error.message);
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
            
            // Add all form data
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    submitData.append(key, formData[key]);
                }
            });

            console.log('Submitting data:', Object.fromEntries(submitData));

            let result;
            if (isEdit) {
                result = await updateObat(obatId, submitData);
                console.log('Update result:', result);
            } else {
                result = await createObat(submitData);
                console.log('Create result:', result);
            }
            
            onSuccess();
        } catch (error) {
            console.error('Error saving obat:', error);
            const errorMessage = error.message || 'Terjadi kesalahan saat menyimpan data';
            alert('Error: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEdit ? 'Edit Obat' : 'Tambah Obat Baru'}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {isEdit ? 'Perbarui informasi obat' : 'Masukkan informasi obat baru'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Obat *
                            </label>
                            <input
                                type="text"
                                name="nama_obat"
                                value={formData.nama_obat}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan nama obat"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Harga *
                            </label>
                            <input
                                type="number"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                required
                                min="0"
                                step="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori *
                        </label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Analgesik">Analgesik</option>
                            <option value="Antihistamin">Antihistamin</option>
                            <option value="Antibiotik">Antibiotik</option>
                            <option value="Penurun Asam Lambung">Penurun Asam Lambung</option>
                            <option value="Vitamin">Vitamin</option>
                            <option value="Obat Batuk">Obat Batuk</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Masukkan deskripsi obat..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gambar Obat
                        </label>
                        <div className="space-y-4">
                            <input
                                type="file"
                                name="gambar"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {preview && (
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute -top-2 -right-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setFormData(prev => ({ ...prev, gambar: null }));
                                                }}
                                                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </span>
                            ) : (
                                isEdit ? 'Update Obat' : 'Simpan Obat'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200 font-medium"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ObatForm;