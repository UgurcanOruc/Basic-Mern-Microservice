const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = [];

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId.find(items => items.postId === req.params.id) ?? [];
    res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    if (content) {
        const id = randomBytes(4).toString('hex');
        const postId = req.params.id;
        const comment = {
            postId, id, content
        };
        commentsByPostId.push(comment);
        res.status(201).send(comment);
    } else {
        res.send({ error: 'Content cannot be empty.'});
    }
});

app.listen(4001, () => {
    console.log('Listening port 4001.')
})