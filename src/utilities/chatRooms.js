const RoomModel = require("../services/rooms/schema");

const addUserToGlobal = async (username, socketId) => {
  try {
    const user = await RoomModel.findOne({
      roomName: "GLOBAL",
      "memers.username": username,
    });
    if (user) {
      await RoomModel.findOneAndUpdate(
        {
          roomName: "GLOBAL",
          "memers.username": username,
        },
        {
          "memers.$.socketId": socketId,
        }
      );
    } else {
      await RoomModel.findOneAndUpdate(
        { roomName: "GLOBAL" },
        { $addToSet: { memers: { username: username, socketId: socketId } } }
      );
    }
    return { username };
  } catch (error) {
    console.log(error);
  }
};

const getMemersInGlobal = async () => {
  try {
    const room = await RoomModel.findOne({ roomName: "GLOBAL" });
    return room.memers;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUserToGlobal, getMemersInGlobal };
