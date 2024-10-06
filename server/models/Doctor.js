import { model, Schema } from 'mongoose';

const doctorSchema = new Schema({
    profilePicture: { type: String },
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    yearsOfExperience: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default model('Doctor', doctorSchema);