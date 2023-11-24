import express from 'express';
import { UserController } from './User.controller';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUserById);
router.delete('/:userId', UserController.deleteUserById);
router.put('/:userId/orders', UserController.addOrderToUser);
router.get('/:userId/orders', UserController.getAllOrdersByUserId);
router.get('/:userId/orders/total-price', UserController.totalPriceOfAllOrdersByUserId);

export const UserRoute = router;
