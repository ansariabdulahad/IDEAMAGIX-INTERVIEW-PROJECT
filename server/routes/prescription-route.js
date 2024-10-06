import { Router } from 'express';
import { createPrescription } from '../controllers/prescription-controller.js';

const router = Router();

router.post('/create', createPrescription);

export default router;