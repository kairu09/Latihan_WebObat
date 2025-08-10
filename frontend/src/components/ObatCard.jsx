import React from 'react';

const ObatCard = ({ obat }) => {
    return (
        <div className="obat-card">
           <img
            src={`http://localhost:3000/images/${obat.gambar}`}
            alt = {obat.nama_obat}
            style = {styles.images}
            />
            
            <h3>{obat.nama_obat}</h3>
            <p><strong>Kategori : </strong>{obat.kategori}</p>
            <p><strong>Deskripsi : </strong>{obat.deskripsi}</p>
            <p><strong>Harga : </strong>Rp {obat.harga}</p>
            <hr />
        </div>
    );
};

const styles = {
    card : {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    images: {
        width: '10%',
        height: 'auto',
        objectFit: 'contain',
        marginBottom: '16px',
    },
};

export default ObatCard;