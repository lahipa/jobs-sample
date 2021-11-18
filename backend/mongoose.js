const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

const mongoDB = (params) => {
  const user = process.env.MONGO_USER_N;
  const password = process.env.MONGO_USER_P;
  const dbName = process.env.MONGO_DBNAME;

  const connect = mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.sgxlb.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      console.log(err ? `${err}` : `Mongo: Connected`);
    }
  );

  return connect;
};

module.exports = mongoDB;
