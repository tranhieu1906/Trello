import {Schema, model} from "mongoose";

const backgroundSchema = new Schema({
    img: {
        type: String,
        required: true
    },
});

export const Background = model("Background", backgroundSchema);