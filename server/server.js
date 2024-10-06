import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import doctorRouter from './routes/doctor-route.js';
import patientRouter from './routes/patient-route.js';
import consultationRouter from './routes/consultation-route.js';
import prescriptionRouter from './routes/prescription-route.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter);
app.use('/api/consultation', consultationRouter);
app.use('/api/prescription', prescriptionRouter);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});