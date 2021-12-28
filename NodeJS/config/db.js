const mongoose = require("mongoose")
const env = require("dotenv")
env.config()

const URI = process.env.URI; 

(async () => {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("connected");
    } catch (error) {
      console.log("Couldn't Connect to server!");
      return "Server Error";
    }
  })();
