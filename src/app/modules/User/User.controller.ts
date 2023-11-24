/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from './User.service';
import { UserValidationSchema } from './User.validation';

// Controller for creating a new user
const createUser = async (req: Request, res: Response) => {
    try {
        const studentData = req.body;
        const parseData = UserValidationSchema.UserSchema.parse(studentData);
        const result = await UserService.createUserDB(parseData);
        res.status(200).send({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
};

// Controller for fetching all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllUsersDB();
        res.status(200).send({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
};

// Controller for fetching a user by id
const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result = await UserService.getUserByIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

// Controller for updating a user by id
const updateUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const userData = req.body;
        const result = await UserService.updateUserByIdDB(userId, userData);
        res.status(200).send({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

// Controller for deleting a user by id
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result = await UserService.deleteUserByIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

// Controller for adding an order to a user
const addOrderToUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const orderData = req.body;
        const parseData = UserValidationSchema.OrderSchema.parse(orderData);
        const result = await UserService.addOrderToUserDB(userId, parseData);
        if (result === null) {
            throw new Error('User not found');
        }
        res.status(200).send({
            success: true,
            message: 'Order added successfully!',
            data: null,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

// Controller for fetching all orders of a user
const getAllOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result = await UserService.getAllOrdersByUserIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

// Controller for fetching total price of all orders of a user
const totalPriceOfAllOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const result =
            await UserService.totalPriceOfAllOrdersByUserIdDB(userId);
        res.status(200).send({
            success: true,
            message: 'Total price fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(404).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                "code": 404,
                "description": "User not found!"
            },
        });
    }
};

export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addOrderToUser,
    getAllOrdersByUserId,
    totalPriceOfAllOrdersByUserId,
};
