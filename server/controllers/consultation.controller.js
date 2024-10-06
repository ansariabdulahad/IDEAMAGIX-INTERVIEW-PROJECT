import Consultation from '../models/Consultation.js';

export const consultationFormSubmit = async (req, res) => {
    try {
        const { doctorId, currentIllness, recentSurgery, familyMedicalHistory, allergies, others
        } = req.body;

        const newConsultant = Consultation({
            doctorId, currentIllness, recentSurgery, familyMedicalHistory, allergies, others
        });

        await newConsultant.save();

        res.status(201).json({
            success: true,
            message: "Consultant saved successfully",
            data: newConsultant
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in consultation process"
        });
    }
}

export const getConsultantList = async (req, res) => {
    try {
        const consultantList = await Consultation.find();

        res.status(200).json({
            success: true,
            message: "Consultants List",
            data: consultantList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in getConsultants"
        });
    }
}

export const getConsultationDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctorConsultation = await Consultation.find({ doctorId });

        if (!doctorConsultation) return res.status(404).json({
            success: false,
            message: "No consultaion found for doctor"
        });

        res.status(200).json({
            success: true,
            message: "Consultation Found",
            data: doctorConsultation
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in consultation"
        });
    }
}