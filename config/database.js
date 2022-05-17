require("dotenv").config();

const url = process.env.MONGO_URL;
const MongoClient = require("mongodb").MongoClient;
let users;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
    console.log("Connected to MongoDB");
});

module.exports = client.db("notes-app").collection("users");