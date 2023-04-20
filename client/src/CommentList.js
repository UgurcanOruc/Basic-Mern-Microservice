import React from "react";

const CommentList = ({ comments }) => {

    const displayComments = comments.map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    });

  return <ul>{displayComments}</ul>;
};

export default CommentList;
