const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Client } = require("@notionhq/client");

require("dotenv").config();
const notionClientId = process.env.NOTION_CLIENT_ID;
const notionClientSecret = process.env.NOTION_CLIENT_SECRET;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/notes", (req, res) => {
    console.log(req.body)
    res.send()
});

app.get("/login/:code", async (req, res) => {
    const { code } = req.params;
    console.log(code);
    const resp = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/oauth/token",
        auth: { username: notionClientId, password: notionClientSecret },
        headers: { "Content-Type": "application/json" },
        data: { code, grant_type: "authorization_code" },
      });
    console.log(resp.data);
    res.json("login");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});