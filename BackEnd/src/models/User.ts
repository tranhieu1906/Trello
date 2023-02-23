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
  },

  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],

  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

export const User = model("User", userSchema);
