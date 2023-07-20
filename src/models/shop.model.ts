import {Model, model, Schema, Types} from "mongoose";

interface IShop extends Document {
    name: string;
    email: string;
    password: string;
}


const shopSchema = new Schema<IShop>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
});

const shop = model<IShop>('shop', shopSchema);

export {
    shop, IShop
}