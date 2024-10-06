import { Router } from 'express';
import { getDoctorById, getDoctorList, register } from '../controllers/doctor-controller.js';

const router = Router();

router.post('/register', register);
router.get('/doctors-list', getDoctorList);
router.get('/:doctorId', getDoctorById);

export default router;