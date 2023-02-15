const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    content: {
      required: true,
      type: String,
    },

    // attachBoard: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Board",
    // },

    attachBoard: {
      title: {
        type: String,
      },
      backgroundURL: {
        type: String,
      },
    },

    new: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Notification = model("Notification", notificationSchema);
