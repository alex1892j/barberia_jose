import bcrypt from 'bcryptjs';
import { Credentials } from '../entitis/Credential';
import jwt from 'jsonwebtoken';
import AppDataSource from '../config/appDataSource';
import { User } from '../entitis/User';


// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find();
};

// Obtener un usuario por ID
export const getUser = async (id: number): Promise<User | null> => {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.findOne({ where: { id } });
};

// Crear un nuevo usuario
export const createNewUser = async (userData: Partial<User>): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    
    // Hashear la contraseña antes de guardar
    if (userData.credentials?.password) {
        const salt = await bcrypt.genSalt(10);
        userData.credentials.password = await bcrypt.hash(userData.credentials.password, salt);
    }

    const newUser = userRepository.create(userData);
    return userRepository.save(newUser);
};

// Verificar credenciales del usuario
export const verifyUserCredentials = async (username: string, password: string): Promise<string | null> => {
    const credentialsRepository = AppDataSource.getRepository(Credentials);
    const credentials = await credentialsRepository.findOne({ where: { username }, relations: ['user'] });

    if (credentials && credentials.password) {
        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, credentials.password);
        if (isMatch) {
            // Generar token JWT si las credenciales son válidas
            const token = jwt.sign({ userId: credentials.user.id }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '1h',
            });
            return token;
        }
    }
    return null;
};
