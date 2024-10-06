import { model, Schema } from 'mongoose';

const consultationSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    // patientId: { type: Schema.ObjectId, ref: 'Patient' },
    currentIllness: { type: String, required: true },
    recentSurgery: { type: String, required: true },
    familyMedicalHistory: { type: String, required: true },
    allergies: { type: String, required: true },
    others: { type: String, required: true },
}, { timestamps: true });

export default model('Consultation', consultationSchema);