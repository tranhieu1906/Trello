const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  members: [
    {
      _id: false,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    },
  ],
  checklist: [
    {
      text: {
        type: String,
      },
      complete: {
        type: Boolean,
      },
    },
  ],
});


export const Card = model("Card", cardSchema);
