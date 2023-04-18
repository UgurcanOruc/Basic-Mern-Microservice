import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/posts", {
      title,
    });
    const postError = document.getElementById("post-error");
    if (response.data.error) {
      postError.innerHTML = response.data.error;
    } else {
      postError.innerHTML = "";
      setTitle("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p id="post-error" className="text-danger"></p>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
