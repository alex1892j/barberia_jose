import { Request, Response } from 'express';
import { getUsers, getUser, createNewUser, verifyUserCredentials } from '../services/userService';

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userId = parseInt(id, 10); // Convertir id a número
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario no válido' });
        }

        const user = await getUser(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};


// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await createNewUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};

// Controlador para iniciar sesión y verificar credenciales
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await verifyUserCredentials(username, password);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};
