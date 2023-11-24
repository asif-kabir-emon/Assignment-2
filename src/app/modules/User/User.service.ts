/* eslint-disable no-unused-vars */
import { TUser } from './User.interface';
import { User } from './User.model';

const createUserDB = async (user: TUser) => {
    const result = await User.create(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = result.toObject();
    return data;
};

const getAllUsersDB = async () => {
    const result = await User.find(
        {},
        { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
    );
    return result;
};

const getUserByIdDB = async (userId: number) => {
    if(await User.isUserExist(userId) === null) {
        throw new Error('User not found');
    }
    const result = await User.findOne({ userId: userId }, { password: 0 });
    return result;
};

const updateUserByIdDB = async (userId: number, userData: TUser) => {
    if(await User.isUserExist(userId) === null) {
        throw new Error('User not found');
    }
    await User.updateOne({ userId: userId }, userData);
    const findUser = await User.findOne({ userId: userId }, { password: 0 });
    return findUser;
};

const deleteUserByIdDB = async (userId: number) => {
    if(await User.isUserExist(userId) === null) {
        throw new Error('User not found');
    }
    const result = await User.deleteMany({ userId: userId });
    if (result.acknowledged === true) {
        return null;
    }
};

export const UserService = {
    createUserDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserByIdDB,
    deleteUserByIdDB,
};
