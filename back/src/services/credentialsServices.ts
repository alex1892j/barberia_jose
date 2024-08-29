import AppDataSource from '../config/appDataSource';
import { Credentials } from '../entitis/Credential';
import { User } from '../entitis/User';
import bcrypt from 'bcryptjs';


export const createCredentialsServices = async (userId: number, username: string, password: string): Promise<Credentials> => {
    const credentialsRepository = AppDataSource.getRepository(Credentials);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCredentials = credentialsRepository.create({ username, password: hashedPassword, user });
    return credentialsRepository.save(newCredentials);
};

