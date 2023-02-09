const {Schema, model} = require("mongoose");

const notificationSchema = new Schema({
        userSend: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        userGet: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },

        Content: {
            required: true,
            type: String
        },

        new: {
            type: Boolean,
            default: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const Notification = model("Notification",notificationSchema)