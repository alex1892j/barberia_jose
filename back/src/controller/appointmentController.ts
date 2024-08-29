import { Request, Response } from 'express';
import { createNewAppointmentServices, getAppointmentByIdServices, getAppointmentsServices, updateAppointmentStatusServices } from '../services/appointmentServices';


export const getAllAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsServices();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};

export const getAppointmentController = async (req: Request, res: Response) => {
    try {
        const appointment = await getAppointmentByIdServices(parseInt(req.params.id));
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment' });
    }
};

export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const { date, time, status, userId } = req.body;
        const newAppointment = await createNewAppointmentServices({ date, time, status }, userId);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment' });
    }
};

export const updateStatusController = async (req: Request, res: Response) => {
    try {
        const updatedAppointment = await updateAppointmentStatusServices(parseInt(req.params.id), req.body.status);
        if (updatedAppointment) {
            res.json(updatedAppointment);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status' });
    }
};
