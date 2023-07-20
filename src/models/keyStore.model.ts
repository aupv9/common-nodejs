import {model, Schema, Types } from "mongoose";


interface Token{
    user: Schema.Types.ObjectId,
    publicKey: string,
    createdAt: Date,
    refreshToken: Types.Array<string>
}

const tokenSchema = new Schema<Token>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "shop"
    },
    publicKey: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: [String],
        default: []
    }
},{
    collection: "keys",
    }
)

const TokenModel = model("key", tokenSchema);

export {
    Token,
    TokenModel
}