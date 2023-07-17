import express from "express";
import { addUser, getUsers } from "../controller/user-controller.js";
import {
  newConversation,
  getConversation,
} from "../controller/conversation-controller.js";
import { getMessages, newMessage } from "../controller/message-controller.js";
import { uploadFile, getImage } from "../controller/image-controller.js";
import upload from "../utils/upload.js";

const route = express.Router();

route.post("/add", addUser);
route.get("/users", getUsers);
route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);
route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessages);
// here upload.single is a middleware which will be called before uploadFile. We have to do this to convert data chunks into whole data
route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getImage);
export default route;
