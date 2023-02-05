const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

export const Comment = model("Comment", commentSchema);
