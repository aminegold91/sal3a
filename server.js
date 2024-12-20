const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors"); // استيراد مكتبة CORS

const app = express();


const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(cors()); // تفعيل CORS
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post("/data", (req, res) => {
  const newData = req.body;

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    const json = JSON.parse(data);
    json.push(newData);

    fs.writeFile("data.json", JSON.stringify(json, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error writing file");
        return;
      }
      res.send("Data added successfully");
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:4000");
});
