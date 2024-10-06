import { model, Schema } from 'mongoose';

const prescriptionSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation' },
    care: { type: String, required: true },
    medicines: { type: String, required: true },
}, { timestamps: true });

export default model('Prescription', prescriptionSchema);