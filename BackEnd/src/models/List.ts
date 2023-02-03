const { Schema, model } = require("mongoose");

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const List = model("List", listSchema);
