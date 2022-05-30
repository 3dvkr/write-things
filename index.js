const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const { getUserInfo, postToNotion, logOut } = require('./controllers/notion');

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());

app.get("/login/:code", getUserInfo);
app.post("/notes", postToNotion);
app.delete("/logout", logOut)

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});