import { Router } from 'express';
import { consultationFormSubmit, getConsultantList, getConsultationDoctorById } from '../controllers/consultation.controller.js';

const router = Router();

router.post('/create', consultationFormSubmit);
router.get('/consult-list', getConsultantList);
router.get('/:doctorId', getConsultationDoctorById);

export default router;