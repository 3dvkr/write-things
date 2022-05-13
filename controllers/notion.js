const axios = require("axios");
const { v4 } = require("uuid")
const { Client } = require("@notionhq/client");

require("dotenv").config();
const notionClientId = process.env.NOTION_CLIENT_ID;
const notionClientSecret = process.env.NOTION_CLIENT_SECRET;

const notionLoginReq = {
  method: "POST",
  url: "https://api.notion.com/v1/oauth/token",
  auth: { username: notionClientId, password: notionClientSecret },
  headers: { "Content-Type": "application/json" },
};

const logInUser = async (req, res, next) => {
  const { code } = req.params;
  console.log(code);
  // let resp;
  try {
    req.resp = await axios({
      ...notionLoginReq,
      data: { code, grant_type: "authorization_code" },
    });
    // create user in DB
    // send back uuid in a cookie
    const userUUID = v4();
    res.cookie("user", userUUID, {
      secure: true,
    });
  } catch (err) {
    console.log(err);
    return;
  }
  next();
};

const getDataFromNotion = async (req, res, next) => {
  try {
    // Get pages and filter out databases from Notion
    const notionClient = new Client({ auth: req.resp.data.access_token });
    const data = await notionClient.search({
      filter: {
        value: "page",
        property: "object",
      },
    });
    const pages = data.results
      .filter((page) => page.parent.workspace)
      .map(({ properties }) => properties.title?.title[0].text.content);
    res.json(pages);
    // TODO: save resp.data.access_token to a database
    // next()
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  logInUser,
  getDataFromNotion,
};
