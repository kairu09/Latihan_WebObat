const API_BASE_URL = 'http://localhost:3000/api';

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
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create obat');
        }
        
        return data;
    } catch (error) {
        console.error('Create API error:', error);
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
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update obat');
        }
        
        return data;
    } catch (error) {
        console.error('Update API error:', error);
        throw error;
    }
};

// DELETE obat
export const deleteObat = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/obat/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete obat');
        }
        
        return data;
    } catch (error) {
        console.error('Delete API error:', error);
        throw error;
    }
};