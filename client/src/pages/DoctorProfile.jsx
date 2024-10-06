import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getConsultationData, getConsultationDataByDoctorId } from '@/redux/slices/consultation-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

const DoctorProfile = () => {

    const location = useLocation();
    const { doctorId } = location.state || "";
    const { doctor, consultations } = useSelector(state => state.consult);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getConsultationData()).then((data) => {
            if (data.payload.success) {
                // const doctorId = data.payload.data.filter((doc) => doc.doctorId == doctorId);
                // console.log(doctorId);

                // dispatch(getConsultationDataByDoctorId())
            }
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch(getConsultationDataByDoctorId(doctorId));
    }, [doctorId]);

    const handlePrescriptionClick = () => {
        navigate(`/prescription`, { state: { doctorId } })
    }

    return (
        <div>
            <h3>Name: {doctor && doctor.name}</h3>
            <p>Speciality: {doctor && doctor.speciality}</p>
            <p>Years Of Experience: {doctor && doctor.yearsOfExperience}</p>
            <Separator className="my-5" />
            <Button
                onClick={handlePrescriptionClick}
            >
                Go to Prescription Page
            </Button>
        </div>
    )
}

export default DoctorProfile