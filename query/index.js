const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = [];

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    const post = {
      id,
      title,
      comments: [],
    };

    posts.push(post);
  } else {
    const { id, content, postId } = data;

    comment = {
      id,
      content,
    };

    let post = posts.find((post) => post.id === postId);

    post.comments.push(comment);
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("Listening port 4002");
});
