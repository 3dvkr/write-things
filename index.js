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
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/dist')));
}

app.get("/api/login/:code", getUserInfo);
app.post("/api/notes", postToNotion);
app.delete("/api/logout", logOut);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname + "/client/public/index.html"));
    });
}

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
