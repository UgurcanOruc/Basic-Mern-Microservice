import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content,
      }
    );

    const commentError = document.getElementById("comment-error");
    if (res.data.error) {
      commentError.innerHTML = res.data.error;
    } else {
      commentError.innerHTML = "";
      setContent("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p id="comment-error" className="text-danger"></p>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
