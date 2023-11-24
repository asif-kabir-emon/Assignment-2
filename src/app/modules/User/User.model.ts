import { TAddress, TUser, TUserFullName, TOrders } from './User.interface';
import { Schema, model } from "mongoose";


const UserFullNameSchema = new Schema<TUserFullName>({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
})

const AddressSchema = new Schema<TAddress>({
    street: { 
        type: String, 
        required: true, 
    },
    city: { 
        type: String, 
        required: true, 
    },
    country: { 
        type: String, 
        required: true, 
    },
})

const OrderSchema = new Schema<TOrders>({
    productName: { 
        type: String, 
        required: true, 
    },
    price: { 
        type: Number, 
        required: true, 
    },
    quantity: { 
        type: Number, 
        required: true, 
    },
})

const UserSchema = new Schema<TUser>({
    userId: { 
        type: Number, 
        required: true, 
        unique: true,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8,
    },
    fullName: { 
        type: UserFullNameSchema, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
    },
    isActive: { 
        type: Boolean,
        default: true,
    },
    hobbies: [
        { 
            type: String, 
            required: true,
        }
    ],
    address: {
        type: AddressSchema,
        required: true,
    },
    orders: [
        {
            type: OrderSchema,
        }
    ]
})


export const User = model<TUser>('User', UserSchema);