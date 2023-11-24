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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_model_1 = require("./User.model");
const createUserDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.create(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = result.toObject(), { password } = _a, data = __rest(_a, ["password"]);
    return data;
});
const getAllUsersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getUserByIdDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = yield User_model_1.User.findOne({ userId: userId }, { password: 0 });
    return result;
});
const updateUserByIdDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    yield User_model_1.User.updateOne({ userId: userId }, userData);
    const findUser = yield User_model_1.User.findOne({ userId: userId }, { password: 0 });
    return findUser;
});
const deleteUserByIdDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = yield User_model_1.User.deleteMany({ userId: userId });
    if (result.acknowledged === true) {
        return null;
    }
});
const addOrderToUserDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = yield User_model_1.User.findOneAndUpdate({ userId: userId }, { $push: { orders: orderData } }, { new: true });
    return result;
});
const getAllOrdersByUserIdDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = yield User_model_1.User.findOne({ userId: userId }, { orders: 1, _id: 0 });
    return result;
});
const totalPriceOfAllOrdersByUserIdDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.User.isUserExist(userId)) === null) {
        throw new Error('User not found');
    }
    const result = yield User_model_1.User.aggregate([
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
        }
    ]);
    return result[0];
});
exports.UserService = {
    createUserDB,
    getAllUsersDB,
    getUserByIdDB,
    updateUserByIdDB,
    deleteUserByIdDB,
    addOrderToUserDB,
    getAllOrdersByUserIdDB,
    totalPriceOfAllOrdersByUserIdDB,
};
