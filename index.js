const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/notes", (req, res) => {
    console.log(req.body)
    res.send()
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});