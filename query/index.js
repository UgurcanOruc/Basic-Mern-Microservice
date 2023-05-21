const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    const post = {
      id,
      title,
      comments: [],
    };

    posts.push(post);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    comment = {
      id,
      content,
      status,
    };

    let post = posts.find((post) => post.id === postId);

    post.comments.push(comment);
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    let post = posts.find((post) => post.id === postId);

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening port 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
