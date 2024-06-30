import mongoose from "mongoose";

const connect=async()=>{
  try {
    console.log("MONGODB_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI as string);
    const connection = mongoose.connection;
    connection.on("open", () => {
      console.log("MongoDB database connection established successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB database connection error: " + err);
      process.exit(1); 
    });
  } catch (error) {
    console.log(error);
  }
  
}

export default connect;