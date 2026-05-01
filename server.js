const path = require("node:path");
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const port = 5001;

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(process.env.PORT || port, () => console.info(`Listening on port ${port}`));

module.exports.handler = serverless(app);
