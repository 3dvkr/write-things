const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

// Controllers
const {home , getNotes} = require('./controllers/routes');
const getUserInfo = require('./controllers/notion');

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/login/:code", getUserInfo);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});