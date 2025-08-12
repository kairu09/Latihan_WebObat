import React, { useEffect, useState } from 'react';
import { createObat, getObat, updateObat } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ObatForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // ada id saat edit
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
  category: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data = await getObat(id);
          setForm({
            name: data.name ?? data.nama ?? data.nama_obat ?? '',
            category: data.category ?? data.kategori ?? '',
            description: data.description ?? data.deskripsi ?? '',
            price: data.price ?? data.harga ?? '',
            stock: data.stock ?? data.stok ?? '',
            imageUrl: data.imageUrl ?? data.gambar ?? '',
          });
        } catch (e) {
          alert(e.message);
        }
      })();
    }
  }, [id, isEdit]);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm((s) => ({ ...s, imageFile: file }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        name: form.name,
  category: form.category,
        description: form.description,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        imageUrl: form.imageUrl,
        imageFile: form.imageFile || undefined,
      };
  if (isEdit) {
        await updateObat(id, payload);
      } else {
        await createObat(payload);
      }
  navigate('/katalog-obat');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Obat' : 'Tambah Obat'}</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={onChange} placeholder="Nama" className="w-full border p-2" required />
  <input name="category" value={form.category} onChange={onChange} placeholder="Kategori" className="w-full border p-2" />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Deskripsi" className="w-full border p-2" />
        <input name="price" value={form.price} onChange={onChange} placeholder="Harga" type="number" className="w-full border p-2" />
        <input name="stock" value={form.stock} onChange={onChange} placeholder="Stok" type="number" className="w-full border p-2" />
        <input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="URL Gambar atau nama file di /images" className="w-full border p-2" />
        <div>
          <label className="block text-sm text-gray-600 mb-1">Upload Gambar (opsional)</label>
          <input type="file" accept="image/*" onChange={onFile} className="block" />
          {(form.imageFile || form.imageUrl) && (
            <div className="mt-2">
              <span className="text-sm text-gray-600">Pratinjau:</span>
              {/* simple preview; for URL show that URL, for file show local preview */}
              <img
                alt="preview"
                className="mt-1 max-h-40 object-contain"
                src={
                  form.imageFile ? URL.createObjectURL(form.imageFile) : form.imageUrl
                }
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Menyimpan...' : 'Simpan'}</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Batal</button>
        </div>
      </form>
    </div>
  );
}