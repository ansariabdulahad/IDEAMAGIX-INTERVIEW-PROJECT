import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createPrescription } from '@/redux/slices/prescription-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import jsPDF from 'jspdf';


const initialFormData = {
    care: '',
    medicines: ''
}

const PrescriptionForm = () => {
    const location = useLocation();
    const { consult } = location.state || {};
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text(`Date: ${Date.now()}`, 10, 10);
        doc.text(`Care to be taken: ${formData.care}`, 10, 20);
        doc.text(`Medicines: ${formData.medicines}`, 10, 30);
        doc.save(`Prescription_${consult._id}.pdf`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.doctorId = consult.doctorId;
        formData.consultationId = consult._id;

        dispatch(createPrescription(formData)).then((data) => {
            if (data.payload.success) {
                handleGeneratePDF();
                alert("data created successfully");
                setFormData(initialFormData);
            } else {
                alert("something went wrong");
            }
        });
    }

    return (
        <div>
            <h2>Prescription Form</h2>

            <Separator className="mb-4" />
            <form onSubmit={handleSubmit}
                className='shadow-sm p-4 space-y-4'
            >
                <div>
                    <Label htmlFor="care">Care</Label>
                    <Input
                        name="care"
                        placeholder="Enter care to be taken"
                        value={formData.care}
                        onChange={(e) => setFormData({
                            ...formData,
                            [e.target.name]: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="medicines">Medicines</Label>
                    <Input
                        name="medicines"
                        placeholder="Enter medicines to be taken"
                        value={formData.medicines}
                        onChange={(e) => setFormData({
                            ...formData,
                            [e.target.name]: e.target.value
                        })}
                        required
                    />
                </div>
                <Button
                    type="submit"
                >Submit and Generate PDF</Button>
            </form>
        </div>
    )
}

export default PrescriptionForm