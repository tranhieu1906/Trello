const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    activity: [
      {
        text: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    backgroundURL: {
      type: String,
    },

    members: [
      {
        _id: false,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          default: "admin",
          enum: ["admin", "observer"],
        },
      },
    ],
    classify: {
      type: String,
      enum: ["individual", "group", "public"],
      default: "individual",
    },
  },
  {
    timestamps: true,
  }
);

export const Board = model("Board", boardSchema);
