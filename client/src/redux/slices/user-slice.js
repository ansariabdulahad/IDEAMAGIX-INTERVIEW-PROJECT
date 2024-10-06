import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";

const initialState = {
    isLoading: false,
    userInfo: null,
    error: null
}

export const registerDoctor = createAsyncThunk('/doctor/',
    async (formData, {rejectWithValue}) => {
        try {
            const { data } = await axios.post(
                '/api/doctor/register',
                formData
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const registerPatient = createAsyncThunk('/patient/',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                '/api/patient/register',
                formData
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerDoctor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload.data;
                state.error = null;
            })
            .addCase(registerDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.userInfo = null;
                state.error = action.payload;
            })
            .addCase(registerPatient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload.data;
                state.error = null;
            })
            .addCase(registerPatient.rejected, (state, action) => {
                state.isLoading = false;
                state.userInfo = null;
                state.error = action.payload;
            })
    }
});

export default userSlice.reducer;