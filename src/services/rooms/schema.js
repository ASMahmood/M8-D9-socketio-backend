const { Schema, model } = require("mongoose");
const RoomsSchema = new Schema({
  roomName: {
    type: String,
  },
  memers: [{ username: String, socketId: String }],
});

const RoomModel = model("Rooms", RoomsSchema);
module.exports = RoomModel;
