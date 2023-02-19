const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },

  phone: {
    type: Number,
  },

  gender: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
  },

  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
});

export const User = model("User", userSchema);
