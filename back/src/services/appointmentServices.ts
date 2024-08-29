import AppDataSource from '../config/appDataSource';
import { Appointment } from '../entitis/Appointment';
import { User } from '../entitis/User';


export const getAppointmentsServices = async (): Promise<Appointment[]> => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    return appointmentRepository.find({ relations: ['user'] });
};

export const getAppointmentByIdServices = async (id: number): Promise<Appointment | null> => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    return appointmentRepository.findOne({ where: { id }, relations: ['user'] });
};

export const createNewAppointmentServices = async (appointmentData: Partial<Appointment>, userId: number): Promise<Appointment> => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const newAppointment = appointmentRepository.create({ ...appointmentData, user });
    return appointmentRepository.save(newAppointment);
};

export const updateAppointmentStatusServices = async (id: number, newStatus: string): Promise<Appointment | null> => {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const appointment = await appointmentRepository.findOne({ where: { id } });
    
    if (appointment) {
        appointment.status = newStatus;
        await appointmentRepository.save(appointment);
        return appointment;
    }
    return null;
};
