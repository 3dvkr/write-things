const axios = require("axios");
const { v4 } = require("uuid");

const { Client } = require("@notionhq/client");

const users = require("../config/database");

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
  try {
    const resp = await axios({
      ...notionLoginReq,
      data: { code, grant_type: "authorization_code" },
    });
    const { access_token, owner } = resp.data;
    let user = await users.findOne({ user: owner.user.id });
    const userUUID = v4();
    if (!user) {
      // create user in database
      await users.insertOne({
        token: access_token,
        user: owner.user.id,
        uuid: userUUID,
      });
    } else {
      // update the user in the collection with a new token
      await users.updateOne(
        { user: owner.user.id },
        { $set: { token: access_token, uuid: userUUID } }
      );
    }
    req.token = access_token;
    res.cookie("user", userUUID, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    next();
  } catch (err) {
    console.log(err);
    return;
  }
};

const getDataFromNotion = async (req, res, next) => {
  try {
    // Get pages and filter out databases from Notion
    const notionClient = new Client({ auth: req.token });
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = [logInUser, getDataFromNotion];
