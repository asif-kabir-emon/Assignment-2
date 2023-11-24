/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserService } from './User.service';
import { UserValidationSchema } from './User.validation';

const createUser = async (req: Request, res: Response) => {
    try {
        const studentData = req.body;
        const parseData = UserValidationSchema.parse(studentData);
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
                code: 404,
                description: error.message + "!",
            },
        });
    }
};

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
                code: 404,
                description: error.message + "!",
            },
        });
    }
};

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
                code: 404,
                description: error.message + "!",
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
};
