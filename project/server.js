const express = require("express");
const app = express();
const port = 2000;
const path = require("path");

app.use(express.static("project/public"));
app.use(express.static("project/public/img"));
app.use(express.static("project/js"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "shop.html"));
});

app.post("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
