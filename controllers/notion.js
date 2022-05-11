const axios = require('axios');
const { Client } = require("@notionhq/client");

require("dotenv").config();
const notionClientId = process.env.NOTION_CLIENT_ID;
const notionClientSecret = process.env.NOTION_CLIENT_SECRET;

const notionLoginReq = {
    method: "POST",
    url: "https://api.notion.com/v1/oauth/token",
    auth: { username: notionClientId, password: notionClientSecret },
    headers: { "Content-Type": "application/json" }
  }

const connectToNotion = async (req, res, next) => {
    const { code } = req.params;
    console.log(code);
    let resp;
    try {
        resp = await axios({
            ...notionLoginReq,
            data: { code, grant_type: "authorization_code" }
        });
        
        // Get pages and filter out databases from Notion
        const notionClient = new Client({ auth: resp.data.access_token });
        const data = await notionClient.search({
            filter: {
              value: "page",
              property: "object",
            },
          });
        const pages = data.results
            .filter(page => page.parent.workspace)
            .map(({ properties }) => properties.title?.title[0].text.content);
        res.json(pages); 
        // TODO: save resp.data.access_token to a database
        // next()
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    connectToNotion
}