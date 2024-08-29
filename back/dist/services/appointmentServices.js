"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatusServices = exports.createNewAppointmentServices = exports.getAppointmentByIdServices = exports.getAppointmentsServices = void 0;
const appDataSource_1 = __importDefault(require("../config/appDataSource"));
const Appointment_1 = require("../entitis/Appointment");
const User_1 = require("../entitis/User");
const getAppointmentsServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = appDataSource_1.default.getRepository(Appointment_1.Appointment);
    return appointmentRepository.find({ relations: ['user'] });
});
exports.getAppointmentsServices = getAppointmentsServices;
const getAppointmentByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = appDataSource_1.default.getRepository(Appointment_1.Appointment);
    return appointmentRepository.findOne({ where: { id }, relations: ['user'] });
});
exports.getAppointmentByIdServices = getAppointmentByIdServices;
const createNewAppointmentServices = (appointmentData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = appDataSource_1.default.getRepository(Appointment_1.Appointment);
    const userRepository = appDataSource_1.default.getRepository(User_1.User);
    const user = yield userRepository.findOne({ where: { id: userId } });
    if (!user)
        throw new Error('User not found');
    const newAppointment = appointmentRepository.create(Object.assign(Object.assign({}, appointmentData), { user }));
    return appointmentRepository.save(newAppointment);
});
exports.createNewAppointmentServices = createNewAppointmentServices;
const updateAppointmentStatusServices = (id, newStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = appDataSource_1.default.getRepository(Appointment_1.Appointment);
    const appointment = yield appointmentRepository.findOne({ where: { id } });
    if (appointment) {
        appointment.status = newStatus;
        yield appointmentRepository.save(appointment);
        return appointment;
    }
    return null;
});
exports.updateAppointmentStatusServices = updateAppointmentStatusServices;
