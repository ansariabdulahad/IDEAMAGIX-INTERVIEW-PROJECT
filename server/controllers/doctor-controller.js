import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { profilePicture = "", name, speciality, email, phoneNumber, yearsOfExperience,
            password
        } = req.body;

        // find the existing docotor first
        const isDoctorExist = await Doctor.findOne({ email });

        if (isDoctorExist) return res.status(400).json({
            success: false,
            message: "Doctor already exists"
        });

        const newDoctor = Doctor({
            profilePicture, name, speciality, email, phoneNumber, yearsOfExperience,
            password: await bcrypt.hash(password, 10)
        });

        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Registeration successful",
            data: newDoctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in register"
        });
    }
}

export const getDoctorList = async (req, res) => {
    try {
        const doctorList = await Doctor.find();

        res.status(200).json({
            success: true,
            message: "Doctors List",
            data: doctorList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in getDoctorList"
        });
    }
}

export const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findOne({ _id: doctorId });

        if (!doctor) return res.status(404).json({
            success: false,
            message: "Doctor not found"
        });

        res.status(200).json({
            success: true,
            message: "Doctor found",
            data: doctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in getdoctorById"
        });
    }
}