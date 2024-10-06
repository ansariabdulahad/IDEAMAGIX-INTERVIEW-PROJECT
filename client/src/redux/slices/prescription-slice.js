import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const initialState = {
    isLoading: false,
    error: null
}

export const createPrescription = createAsyncThunk('/createPrescription/',
    async (formData) => {
        const { data } = await axios.post(
            '/api/prescription/create',
            formData
        );
        return data;
    }
);

const prescriptionSlice = createSlice({
    name: 'prescriptionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    }
});

export default prescriptionSlice.reducer;