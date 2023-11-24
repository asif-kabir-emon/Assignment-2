/* eslint-disable no-unused-vars */
import { TOrders, TUser } from './User.interface';
import { User } from './User.model';

const createUserDB = async (user: TUser) => {
    if (await User.isUserExist(user.userId)) {
        throw new Error('User not found');
    }
    if (await User.isUsernameExist(user.username)) {
        throw new Error('User not found');
    }
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
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = await User.findOne({ userId: userId }, { password: 0 });
    return result;
};

const updateUserByIdDB = async (userId: number, userData: TUser) => {
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    await User.updateOne({ userId: userId }, userData);
    const findUser = await User.findOne({ userId: userId }, { password: 0 });
    return findUser;
};

const deleteUserByIdDB = async (userId: number) => {
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = await User.deleteMany({ userId: userId });
    if (result.acknowledged === true) {
        return null;
    }
};

const addOrderToUserDB = async (userId: number, orderData: TOrders) => {
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = await User.findOneAndUpdate(
        { userId: userId },
        { $push: { orders: orderData } },
        { new: true },
    );

    return result;
};

const getAllOrdersByUserIdDB = async (userId: number) => {
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = await User.findOne(
        { userId: userId },
        { orders: 1, _id: 0 },
    );
    return result;
};

const totalPriceOfAllOrdersByUserIdDB = async (userId: number) => {
    if ((await User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = await User.aggregate([
        {
            $match: { userId: userId },
        },
        {
            $unwind: '$orders',
        },
        {
            $group: {
                _id: '$userId',
                totalPrice: {
                    $sum: {
                        $multiply: ['$orders.price', '$orders.quantity'],
                    },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);
    return result[0];
};

export const UserService = {
    createUserDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserByIdDB,
    deleteUserByIdDB,
    addOrderToUserDB,
    getAllOrdersByUserIdDB,
    totalPriceOfAllOrdersByUserIdDB,
};
