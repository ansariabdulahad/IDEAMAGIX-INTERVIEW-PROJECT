import DynamicForm from '@/components/DynamicForm'
import React, { useState } from 'react'
import formConfig from '../config/formConfig.json';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor } from '@/redux/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const initialFormData = {
    profilePicture: '',
    name: '',
    speciality: '',
    email: '',
    phoneNumber: '',
    yearsOfExperience: ''
};

const DoctorSignup = () => {

    const [formData, setFormData] = useState(initialFormData);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name == "" || formData.speciality == "" || formData.email == "" ||
            formData.yearsOfExperience == "" || formData.phoneNumber == "") {
            alert("please fill all the fields");
        } else {
            dispatch(registerDoctor(formData)).then((data) => {
                if (data.payload.success) {
                    const doctorId = data.payload.data._id;

                    setFormData(initialFormData);
                    navigate('/doctor-profile', { state: { doctorId } });
                } else {
                    alert("some thing went wrong " + data.payload.message);
                }
            });
        }
    }

    return (
        <div className='max-w-lg mx-auto'>
            <h2>Doctor Signup</h2>
            <Separator className="mb-4" />
            <DynamicForm
                formConfig={formConfig.doctorSignUp}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default DoctorSignup