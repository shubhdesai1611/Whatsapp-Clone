import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (UserData, socketId) => {
  !users.some((user) => user.sub == UserData.sub) &&
    users.push({ ...UserData, socketId });
};

const getUser = (userSub) => {
  return users.find((user) => user.sub === userSub);
};

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    io.to(user.socketId).emit("getMessage", data);
  });
});
