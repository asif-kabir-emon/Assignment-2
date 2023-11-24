import express from 'express';
import { UserController } from './User.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUserById);
router.delete('/:userId', UserController.deleteUserById);

export const UserRoute = router;
