import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DoctorSignup from './pages/DoctorSignup'
import PatientSignup from './pages/PatientSignup'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import DoctorList from './pages/DoctorList'
import DoctorProfile from './pages/DoctorProfile'
import ConsultationForm from './pages/ConsultationForm'
import Prescription from './pages/Prescription'
import PrescriptionForm from './pages/prescription-form'
import Admin from './pages/Admin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<DoctorSignup />} />
        <Route path='/patient' element={<PatientSignup />} />
        <Route path='/doctors-list' element={<DoctorList />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
        <Route path='/consultation-form' element={<ConsultationForm />} />
        <Route path='/prescription' element={<Prescription />} />
        <Route path='/prescription-form' element={<PrescriptionForm />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App