const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// GET all obat
export const getAllObat = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat`);
        if (!response.ok) throw new Error('Failed to fetch obat');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// GET obat by ID
export const getObatById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat/${id}`);
        if (!response.ok) throw new Error('Failed to fetch obat');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// CREATE new obat
export const createObat = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat`, {
            method: 'POST',
            body: formData // FormData for file upload
        });
        if (!response.ok) throw new Error('Failed to create obat');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// UPDATE obat
export const updateObat = async (id, formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat/${id}`, {
            method: 'PUT',
            body: formData // FormData for file upload
        });
        if (!response.ok) throw new Error('Failed to update obat');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// DELETE obat
export const deleteObat = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete obat');
        return await response.json();
    } catch (error) {
        throw error;
    }
};