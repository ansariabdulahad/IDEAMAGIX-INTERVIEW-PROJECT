import { model, Schema } from 'mongoose';

const patientSchema = new Schema({
    profilePicture: { type: String },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    historyOfSurgery: { type: String, required: true },
    historyOfIllness: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default model('Patient', patientSchema);