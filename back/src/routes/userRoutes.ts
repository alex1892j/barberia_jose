import { Router } from 'express';
import { getAllUsers, getUserById, createUser, loginUser } from '../controller/userController';

const router = Router();

router.get('/users', getAllUsers);
router.get('/:id', getUserById);
router.post('/createUser', createUser);
router.post('/login', loginUser);

export default router;
