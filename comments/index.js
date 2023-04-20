const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [];

app.get("/posts/:id/comments", (req, res) => {
  const comments =
    commentsByPostId.filter((items) => items.postId === req.params.id) ?? [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  if (content) {
    const id = randomBytes(4).toString("hex");
    const postId = req.params.id;
    const comment = {
      postId,
      id,
      content,
    };
    commentsByPostId.push(comment);

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: comment,
    });

    res.status(201).send(comment);
  } else {
    res.send({ error: "Content cannot be empty." });
  }
});

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);
  res.send({});
})

app.listen(4001, () => {
  console.log("Listening port 4001.");
});
