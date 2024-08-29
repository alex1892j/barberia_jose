import { Request, Response } from 'express';
import { createCredentialsServices } from '../services/credentialsServices';
import { verifyUserCredentials } from '../services/userService';



// Controlador para crear nuevas credenciales
export const createCredentialsController = async (req: Request, res: Response) => {
    try {
        // Extrae userId, username, y password del cuerpo de la solicitud
        const { userId, username, password } = req.body;

        // Asegúrate de que todos los valores están presentes
        if (!userId || !username || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Llama al servicio con los tres argumentos
        const credentials = await createCredentialsServices(userId, username, password);

        res.status(201).json(credentials);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Se produjo un error desconocido' });
        }
    }
};

