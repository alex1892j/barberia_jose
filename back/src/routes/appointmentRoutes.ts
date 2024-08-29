import { Router } from 'express';
import { createAppointmentController, getAllAppointmentsController, getAppointmentController, updateStatusController } from '../controller/appointmentController';


const router = Router();

router.get('/appointments', getAllAppointmentsController);
router.get('/:id', getAppointmentController);
router.post('/createAppointment', createAppointmentController);
router.patch('/:id/status', updateStatusController);

export default router;
