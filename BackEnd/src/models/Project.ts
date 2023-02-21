const { Schema, model } = require("mongoose");

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    permission: {
      type: String,
      default: "private",
      enum: ["public", "private"],
    },

    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],

    describe: {
      type: String,
      required: false,
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
          default: "edit",
          enum: ["see", "edit", "manage"],
        },
      },
    ],

    owner: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Project = model("Project", GroupSchema);
