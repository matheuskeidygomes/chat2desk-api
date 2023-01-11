import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import Auth from '../middlewares/Authentication';

const router = Router();

// User Routes ------------------------------------------------------------------

// Login and Register

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Profile Settings

router.get('/profile', Auth.private, UserController.getMyUser);
router.put('/profile', Auth.private, UserController.updateMyUser);
router.delete('/profile', Auth.private, UserController.deleteMyUser);

// Users Data Visualization 

router.get('/users', Auth.private, UserController.getAllUsers);
router.get('/users/:id', Auth.private, UserController.getOneUser);

export default router;