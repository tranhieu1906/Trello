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
      "https://vcdn1-giaitri.vnecdn.net/2022/12/15/avatar-2-1-jpeg-2238-1671050566.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=Gjwi0rqvUSZXSzXx1YrqaA",
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
