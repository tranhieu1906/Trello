const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "boards",
    },
  ],
});

export const User = model("user", UserSchema);
