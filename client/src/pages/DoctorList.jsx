import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getDoctorList, getPatientList } from '@/redux/slices/getList-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DoctorList = () => {

    const { doctorList, patientList } = useSelector(state => state.listOfUser);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDoctorList());
        dispatch(getPatientList());
    }, [dispatch]);

    const handleOnConcultClick = (doctor) => {

        navigate('/consultation-form', { state: { doctor } });
    }


    // <p>{`History of illness: ${currentPatient.historyOfIllness} , History of surgery: ${currentPatient.historyOfSurgery}`}</p>
    return (
        <div className='flex flex-col gap-8'>
            <h2>Doctors List</h2>
            <Separator className="mb-4" />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    doctorList && doctorList.length > 0 ? (
                        doctorList.map((doctor, index) => (
                            <Card className="shadow-sm hover:shadow-lg"
                                key={index}
                            >
                                <CardHeader>
                                    <CardTitle className="mx-auto">
                                        <Avatar>
                                            <AvatarImage src={doctor.profilePicture || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h3 className='text-center'>{doctor.name}</h3>
                                    <div className='flex gap-4 items-center justify-between my-2 text-gray-500'>
                                        <p>{doctor.speciality}</p>
                                        <p>{doctor.yearsOfExperience} years</p>
                                    </div>
                                    <Button className="w-full"
                                        onClick={() => handleOnConcultClick(doctor)}
                                    >Consult</Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (null)
                }
            </div>
        </div>
    )
}

export default DoctorList