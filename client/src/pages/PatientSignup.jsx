import DynamicForm from '@/components/DynamicForm'
import React, { useEffect, useState } from 'react'
import formConfig from '../config/formConfig.json';
import { useDispatch, useSelector } from 'react-redux';
import { registerPatient } from '@/redux/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { getDoctorList, getPatientList } from '@/redux/slices/getList-slice';

const initialFormData = {
    profilePicture: '',
    name: '',
    age: '',
    email: '',
    phoneNumber: '',
    historyOfSurgery: '',
    historyOfIllness: ''
};

const PatientSignup = () => {

    const [formData, setFormData] = useState(initialFormData);
    const { userInfo } = useSelector(state => state.user);
    const { doctorList, patientList } = useSelector(state => state.listOfUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDoctorList());
        dispatch(getPatientList());
    }, [dispatch]);

    console.log(doctorList);
    console.log(patientList);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name == "" || formData.age == "" || formData.email == "" ||
            formData.phoneNumber == "" || formData.historyOfSurgery == "" ||
            formData.historyOfIllness == "") {
            alert("please all the fileds");
        } else {
            dispatch(registerPatient(formData)).then((data) => {
                if (data.payload.success) {
                    setFormData(initialFormData);
                    navigate('/doctors-list');
                } else {
                    alert("some thing went wrong " + data.payload.message);
                }
            });
        }
    }

    return (
        <div>
            <h2>Patient Signup</h2>
            <Separator className="mb-4" />
            <DynamicForm
                formConfig={formConfig.patientSignUp}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default PatientSignup