const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cards",
    required: true,
  },
});

export const Comment = model("comment", CommentSchema);
