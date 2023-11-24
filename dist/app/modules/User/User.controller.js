"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_service_1 = require("./User.service");
const User_validation_1 = require("./User.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        const parseData = User_validation_1.UserValidationSchema.UserSchema.parse(studentData);
        const result = yield User_service_1.UserService.createUserDB(parseData);
        res.status(200).send({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_service_1.UserService.getAllUsersDB();
        res.status(200).send({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield User_service_1.UserService.getUserByIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const userData = req.body;
        const result = yield User_service_1.UserService.updateUserByIdDB(userId, userData);
        res.status(200).send({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield User_service_1.UserService.deleteUserByIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
const addOrderToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orderData = req.body;
        const parseData = User_validation_1.UserValidationSchema.OrderSchema.parse(orderData);
        const result = yield User_service_1.UserService.addOrderToUserDB(userId, parseData);
        if (result === null) {
            throw new Error('User not found');
        }
        res.status(200).send({
            success: true,
            message: 'Order added successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
const getAllOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield User_service_1.UserService.getAllOrdersByUserIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
const totalPriceOfAllOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield User_service_1.UserService.totalPriceOfAllOrdersByUserIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'Total price fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 404,
                description: error.message + '!',
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addOrderToUser,
    getAllOrdersByUserId,
    totalPriceOfAllOrdersByUserId,
};
