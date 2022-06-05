const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { getUserInfo, postToNotion, logOut } = require("./controllers/notion");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get("/login/:code", getUserInfo);
app.post("/notes", postToNotion);
app.delete("/logout", logOut);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/public/index.html"));
  });

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
