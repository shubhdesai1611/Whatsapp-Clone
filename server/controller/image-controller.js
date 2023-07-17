import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8000";

let gfs, gridFsBucket;

const conn = mongoose.connection;
// fs is bucket which contains information in mnogoDB
// grid(database name, mongo server)
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (request, response) => {
  if (!request.file) {
    return response.status(404).json("File Not Found");
  }
  const imageUrl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageUrl);
};

// we will have fs.file  as collection in database
export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readstream = gridFsBucket.openDownloadStream(file._id);
    readstream.pipe(response);
  } catch (error) {
    response.status(500).json(error.message);
  }
};
