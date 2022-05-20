require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
    console.log("Connected to MongoDB");
});

module.exports = client.db("notes-app").collection("users");