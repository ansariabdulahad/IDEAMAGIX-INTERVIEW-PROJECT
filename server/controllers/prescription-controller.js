import Prescription from "../models/Prescription.js";

export const createPrescription = async (req, res) => {
    try {
        const newPrescription = Prescription(req.body);

        await newPrescription.save();

        res.status(201).json({
            success: true,
            message: "newPrescription saved successfully",
            data: newPrescription
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred in newPrescription process"
        });
    }
}