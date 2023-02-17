const { Schema, model } = require("mongoose");

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  category: [
    {
      type: String,
      required: true,
    },
  ],

  permission: {
    type: String,
    required: true,
  },
});

export const List = model("Group", GroupSchema);
