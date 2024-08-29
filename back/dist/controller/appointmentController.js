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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusController = exports.createAppointmentController = exports.getAppointmentController = exports.getAllAppointmentsController = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getAllAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentServices_1.getAppointmentsServices)();
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});
exports.getAllAppointmentsController = getAllAppointmentsController;
const getAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appointmentServices_1.getAppointmentByIdServices)(parseInt(req.params.id));
        if (appointment) {
            res.json(appointment);
        }
        else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching appointment' });
    }
});
exports.getAppointmentController = getAppointmentController;
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, status, userId } = req.body;
        const newAppointment = yield (0, appointmentServices_1.createNewAppointmentServices)({ date, time, status }, userId);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating appointment' });
    }
});
exports.createAppointmentController = createAppointmentController;
const updateStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAppointment = yield (0, appointmentServices_1.updateAppointmentStatusServices)(parseInt(req.params.id), req.body.status);
        if (updatedAppointment) {
            res.json(updatedAppointment);
        }
        else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating appointment status' });
    }
});
exports.updateStatusController = updateStatusController;
