import { model, Schema, Types, Document } from "mongoose";




interface Token extends Document{
    user: Types.ObjectId,
    publicKey: string,
    createdAt: Date,
    refreshToken: Types.Array<string>
}


const tokenSchema = new Schema<Token>({
    user:{
        type: Schema.Types.ObjectId,
        ref: "shop",
        required: true
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
    },
    {
    collection: "keys",
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
    }
)

const TokenModel = model<Token>("key", tokenSchema);

export {
    Token,
    TokenModel
}