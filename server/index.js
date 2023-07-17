import express from "express";

//to share data between two different ports we have to use cors
import cors from "cors";

// to parse the body from browser
import bodyParser from "body-parser";

import Connection from "./database/db.js";

import Route from "./routes/route.js";

const app = express();

//use cors as a function with express
app.use(cors());

//user bodyParser with express
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // it is used to fill space and other invalid characters

//use Route with express
app.use("/", Route);

Connection();

app.listen(8000, () => {
  console.log(`Server is running currently on port 8000`);
});
