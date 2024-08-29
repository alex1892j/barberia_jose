import { Router } from 'express';
import { createCredentialsController } from '../controller/credentialsController';



const router = Router();

router.post('/credentials', createCredentialsController);


export default router;

