import Patient from '../models/Patient.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { profilePicture = "", name, age, email, phoneNumber, historyOfSurgery,
            historyOfIllness, password
        } = req.body;

        // find the existing docotor first
        const isPatientExist = await Patient.findOne({ email });

        if (isPatientExist) return res.status(400).json({
            success: false,
            message: "Patient already exists"
        });

        const newPatient = Patient({
            profilePicture, name, age, email, phoneNumber, historyOfSurgery,
            historyOfIllness,
            password: await bcrypt.hash(password, 10)
        });

        await newPatient.save();

        res.status(201).json({
            success: true,
            message: "Registeration successful",
            data: newPatient
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in register"
        });
    }
}

export const getPatientList = async (req, res) => {
    try {
        const patientList = await Patient.find();
        
        res.status(200).json({
            success: true,
            message: "Patients List",
            data: patientList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in getDoctorList"
        });
    }
}