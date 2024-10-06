import { Router } from 'express';
import { getPatientList, register } from '../controllers/patient-controller.js';

const router = Router();

router.post('/register', register);
router.get('/patients-list', getPatientList);

export default router;