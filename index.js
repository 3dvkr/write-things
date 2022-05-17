const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

// Controllers
const {home , getNotes} = require('./controllers/routes');
const { logInUser, getDataFromNotion } = require('./controllers/notion');

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const url = process.env.MONGO_URL;
const mongo = require("mongodb").MongoClient;
let users;
mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    const db = client.db("notes-app");
    users = db.collection("users");
  }
);


app.get("/", home);

app.post("/notes", getNotes);

app.get("/login/:code", logInUser, getDataFromNotion);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});