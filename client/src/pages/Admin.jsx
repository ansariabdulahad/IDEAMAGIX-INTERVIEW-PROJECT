import { Separator } from '@/components/ui/separator';
import { getDoctorList, getPatientList } from '@/redux/slices/getList-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
    const { doctorList, patientList } = useSelector(state => state.listOfUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDoctorList());
        dispatch(getPatientList());
    }, [dispatch]);

    return (
        <div>
            <section>
                <h1>Doctors</h1>
                <Separator className="my-4" />

                {
                    doctorList && doctorList.length > 0 ? (
                        doctorList.map((doctor, index) => (
                            <div key={index}>
                                <li>{index + 1} Doctor - {doctor.name}</li>
                            </div>
                        ))
                    ) : (null)
                }
            </section>
            <Separator className="my-4" />
            <section>
                <h1>Patient</h1>
                <Separator className="my-4" />

                {
                    patientList && patientList.length > 0 ? (
                        patientList.map((patient, index) => (
                            <div key={index}>
                                <li>{index + 1} Doctor - {patient.name}</li>
                            </div>
                        ))
                    ) : (null)
                }
            </section>
        </div>
    )
}

export default Admin