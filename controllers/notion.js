const axios = require('axios');

require("dotenv").config();
const notionClientId = process.env.NOTION_CLIENT_ID;
const notionClientSecret = process.env.NOTION_CLIENT_SECRET;

const notionPost = {
    method: "POST",
    url: "https://api.notion.com/v1/oauth/token",
    auth: { username: notionClientId, password: notionClientSecret },
    headers: { "Content-Type": "application/json" },
    // data: { code, grant_type: "authorization_code" },
  }

const connectToNotion = async (req, res) => {
    const { code } = req.params;
    console.log(code);
    const resp = await axios({
        ...notionPost,
        data: { code, grant_type: "authorization_code" }
    });
    console.log(resp.data);
    res.json("login");
}

module.exports = {
    connectToNotion
}