import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
    isLoading: false,
    doctorList: null,
    patientList: null,
    error: null
}

export const getDoctorList = createAsyncThunk('/doctor/list',
    async () => {
        const { data } = await axios.get(
            '/api/doctor/doctors-list'
        );
        return data;
    }
);

export const getPatientList = createAsyncThunk('/patient/list',
    async () => {
        const { data } = await axios.get(
            '/api/patient/patients-list'
        );
        return data;
    }
);

const getListSlice = createSlice({
    name: 'getListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDoctorList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctorList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctorList = action.payload.data;
                state.error = null;
            })
            .addCase(getDoctorList.rejected, (state, action) => {
                state.isLoading = false;
                state.doctorList = null;
                state.error = action.payload;
            })
            .addCase(getPatientList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPatientList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patientList = action.payload.data;
                state.error = null;
            })
            .addCase(getPatientList.rejected, (state, action) => {
                state.isLoading = false;
                state.patientList = null;
                state.error = action.payload;
            })
    }
});

export default getListSlice.reducer;