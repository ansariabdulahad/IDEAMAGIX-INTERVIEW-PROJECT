import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
    isLoading: false,
    consultations: null,
    doctor: null,
    doctorConsultation: null,
    error: null
}

export const createConsultation = createAsyncThunk('/createConsultation/',
    async (formData) => {
        const { data } = await axios.post(
            '/api/consultation/create',
            formData
        );
        return data;
    }
);

export const getConsultationData = createAsyncThunk('/getConsultationData/',
    async () => {
        const { data } = await axios.get(
            '/api/consultation/consult-list'
        );
        return data;
    }
);

export const getConsultationDataByDoctorId = createAsyncThunk('/getConsultationDataByDoctorId',
    async (doctorId) => {
        const { data } = await axios.get(`/api/consultation/${doctorId}`);
        return data;
    }
)

const consultationSlice = createSlice({
    name: 'consultationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getConsultationData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getConsultationData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.consultations = action.payload.data;
                state.error = null;
            })
            .addCase(getConsultationData.rejected, (state, action) => {
                state.isLoading = false;
                state.consultations = null;
                state.error = action.payload;
            })
            .addCase(getConsultationDataByDoctorId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getConsultationDataByDoctorId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctorConsultation = action.payload.data;
                state.error = null;
            })
            .addCase(getConsultationDataByDoctorId.rejected, (state, action) => {
                state.isLoading = false;
                state.doctorConsultation = null;
                state.error = action.payload;
            })
    }
});

export default consultationSlice.reducer;