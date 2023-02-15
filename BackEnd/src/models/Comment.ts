const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = model("Comment", commentSchema);
