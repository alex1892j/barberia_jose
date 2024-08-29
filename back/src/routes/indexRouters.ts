import { Router } from 'express';
import userRoutes from './userRoutes';
import appointmentRoutes from './appointmentRoutes';
import credentialsRoutes from './credentialsRoutes';

const indexRouters = Router();

indexRouters.use('/apiIndex', userRoutes);
indexRouters.use('/apiIndex', appointmentRoutes);
indexRouters.use('/apiIndex', credentialsRoutes);

export default indexRouters;
