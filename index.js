const express = require('express');
const cors = require('cors');

const app = express();

// Controllers
const {home , getNotes} = require('./controllers/routes');
const { connectToNotion } = require('./controllers/notion');

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", home);

app.post("/notes", getNotes);

app.get("/login/:code", connectToNotion);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});