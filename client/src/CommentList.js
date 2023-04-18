import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId}) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        console.log(res);
        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, []);

    console.log(comments);
    const displayComments = Object.values(comments).map(comment => {
        return (
            <li key={comment.id}>{comment.content}</li>
        )
    });


  return <ul>{displayComments}</ul>;
};

export default CommentList;