import mongoose from "mongoose";
import "colors";

let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL, { bufferCommands: false })
      .then((mongooseInstance) => {
        console.log(
          `Connected to MongoDb Database ${mongooseInstance.connection.host}.`
            .bgBrightGreen.black
        );
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.log(`MongoDb Database Error ${err}.`.bgBrightRed.white);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
