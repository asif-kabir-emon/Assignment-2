"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const router = express_1.default.Router();
router.get('/', User_controller_1.UserController.getAllUsers);
router.get('/:userId', User_controller_1.UserController.getUserById);
router.post('/', User_controller_1.UserController.createUser);
router.put('/:userId', User_controller_1.UserController.updateUserById);
router.delete('/:userId', User_controller_1.UserController.deleteUserById);
router.put('/:userId/orders', User_controller_1.UserController.addOrderToUser);
router.get('/:userId/orders', User_controller_1.UserController.getAllOrdersByUserId);
router.get('/:userId/orders/total-price', User_controller_1.UserController.totalPriceOfAllOrdersByUserId);
exports.UserRoute = router;
