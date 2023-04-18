const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  if (title) {
    const id = randomBytes(4).toString("hex");
    const post = {
      id,
      title,
    };
    posts.push(post);

    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: post,
    });

    res.status(201).send(post);
  } else {
    res.send({ error: "Title cannot be empty." });
  }
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
