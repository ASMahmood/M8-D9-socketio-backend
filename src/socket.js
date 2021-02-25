const socketio = require("socket.io");
const { getMemersInGlobal, addUserToGlobal } = require("./utilities/chatRooms");

const createSocketServer = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    console.log("new connection:", socket.id);

    socket.on("setUsername", async (data) => {
      try {
        console.log(data);
        await addUserToGlobal(
          (username = data.username),
          (socketId = socket.id)
        );

        socket.join("GLOBAL");

        const arivalMessage = {
          sender: "Jesus Christ, Lich King of The Memers",
          text: `${username} has joined the party!`,
          createdAt: new Date(),
        };

        socket.broadcast.to("GLOBAL").emit("bmsg", arivalMessage);
      } catch (error) {
        console.log(error);
      }
    });

    // socket.on("list", async () => {
    //   try {
    //     const memers = await getMemersInGlobal();

    //     console.log(memers);
    //     io.to("GLOBAL").emit(memers);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  });
};

module.exports = createSocketServer;
