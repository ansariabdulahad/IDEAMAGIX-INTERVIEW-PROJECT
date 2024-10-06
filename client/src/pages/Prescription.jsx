import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getConsultationDataByDoctorId } from '@/redux/slices/consultation-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Prescription = () => {
    const location = useLocation();
    const { doctorId } = location.state || "";
    const { doctorConsultation } = useSelector(state => state.consult);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getConsultationDataByDoctorId(doctorId));
    }, [dispatch]);

    console.log(doctorConsultation);

    const handlePrescription = (consult) => {
        navigate('/prescription-form', { state: { consult } })
    }

    return (
        <div>
            <h1>Consultations</h1>
            <Separator className="my-4" />
            {
                doctorConsultation && doctorConsultation.length > 0 ? (
                    doctorConsultation.map((consult, index) => (
                        <div
                            key={index}
                            className='flex justify-between gap-4 space-y-4 items-center'
                        >
                            <li>Patient No {index + 1}</li>
                            <Button
                                onClick={() => handlePrescription(consult)}
                            >Write Prescription</Button>
                        </div>
                    ))
                ) : (
                    null
                )
            }

        </div>
    )
}

export default Prescription