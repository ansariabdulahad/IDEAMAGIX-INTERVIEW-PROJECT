import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { createConsultation } from '@/redux/slices/consultation-slice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const initialFormData = {
    doctorId: '',
    currentIllness: '',
    recentSurgery: '',
    familyMedicalHistory: 'nonDiabetes',
    allergies: '',
    others: '',
};

const ConsultationForm = () => {
    const location = useLocation();
    const { doctor } = location.state || {};
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { consultations } = useSelector(state => state.consult);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.currentIllness == "" || formData.recentSurgery == "" ||
            formData.allergies == "" || formData.familyMedicalHistory == "" ||
            formData.others == ""
        ) {
            alert('please fill all the fields');
        } else {
            formData.doctorId = doctor._id;
            dispatch(createConsultation(formData)).then((data) => {
                if (data.payload.success) {
                    alert("Consultation data successfully sent");
                    setFormData(initialFormData);
                    navigate('/doctors-list');

                } else {
                    alert("Error sending");
                }
            });
        }
    }

    return (
        <div>
            <div>
                <h2>{`Doctor Name: ${doctor.name}`}</h2>
                <p className='text-gray-500'>{`Speciality: ${doctor.speciality}`}</p>
                <p className='text-gray-500'>{`Years of experience: ${doctor.yearsOfExperience}`}</p>
            </div>
            <Separator className="mb-4" />
            <form onSubmit={handleSubmit}
                className='shadow-sm p-4'
            >
                {
                    step === 1 && (
                        <div className='space-y-4'>
                            <h2>Step 1:</h2>
                            <div>
                                <Label htmlFor="current illness">Current illness</Label>
                                <Input
                                    type="text"
                                    placeholder="illness"
                                    name="currentIllness"
                                    value={formData.currentIllness}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="current surgery">Recent Surgery</Label>
                                <Input
                                    type="text"
                                    placeholder="Surgery"
                                    name="recentSurgery"
                                    value={formData.recentSurgery}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <Button
                                className="float-end"
                                type="button"
                                onClick={() => setStep(2)}
                            >Next</Button>
                        </div>
                    )
                }
                {
                    step === 2 && (
                        <div className='space-y-4'>
                            <h2>Step 2:</h2>
                            <div>
                                <Label htmlFor="Family medical history">Family medical history</Label>
                                <RadioGroup defaultValue={formData.familyMedicalHistory}
                                    name="familyMedicalHistory"
                                    onValueChange={(value) => setFormData({
                                        ...formData,
                                        familyMedicalHistory: value
                                    })}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={"diabetes"}
                                            id="diabetes"
                                            name="diabetes"
                                            className="border-2 border-blue-500 text-blue-500 bg-inherit data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-full"
                                        />
                                        <Label htmlFor="diabetes">Diabetics</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={"nonDiabetes"}
                                            id="nonDiabetes"
                                            name="nonDiabetes"
                                            className="border-2 border-blue-500 text-blue-500 bg-inherit data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 rounded-full"
                                        />
                                        <Label htmlFor="nonDiabetes">Non-Diabetics</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <Label htmlFor="allergies">Any Allergies</Label>
                                <Input
                                    type="text"
                                    placeholder="allergies"
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="others">Others</Label>
                                <Input
                                    type="text"
                                    placeholder="others"
                                    name="others"
                                    value={formData.others}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <div className='flex justify-end gap-4'>
                                <Button
                                    className="float-end"
                                    type="button"
                                    onClick={() => setStep(1)}
                                >Prev</Button>
                                <Button
                                    className="float-end"
                                    type="button"
                                    onClick={() => setStep(3)}
                                >Next</Button>
                            </div>
                        </div>
                    )
                }
                {
                    step === 3 && (
                        <div className='space-y-4'>
                            <h2>Final Step:</h2>
                            <p>Submit the Consultation details</p>
                            <div className='flex justify-end gap-4'>
                                <Button
                                    className="float-end"
                                    type="button"
                                    onClick={() => setStep(2)}
                                >Prev</Button>
                                <Button
                                    className="float-end"
                                    type="submit"
                                >Submit</Button>
                            </div>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default ConsultationForm