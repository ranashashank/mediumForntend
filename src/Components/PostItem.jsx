
import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.css"; 

const PostItem = ({ post, savedForLater, morePost, removeS,disable}) => {
  return (
    <div className="post-item" key={post.id}>
      <div className="content">
        <Link to={`/post/${post.id}`} className="link">
          <h2 className="title">{post.title}</h2>
        </Link>
        <p className="author">Author: {post.author}</p>
        <Link to={`/post/${post.id}`} className="link">
          <p className="text">{post.text.substr(0, 100)}</p>
        </Link>
        <div className="lower">
          <p className="date">Date: {post.created_at.substr(0, 10)}</p>
          <p className="topic">Topic: {post.topic}</p>
          <p>Reading Time: {post.reading_time_minute} minutes</p>
          <p>Likes: {post.likes.length}</p>
          <p>Views: {post.views}</p>
    
         { removeS?(<button
            onClick={() => {
              savedForLater(post);
            }}
            className="btn-save"
          >
            Remove From Save
          </button>):(<button
            onClick={() => {
              savedForLater(post);
            }}
            className="btn-save"
          >
            Save for later
          </button>)}
          <button
            onClick={() => {
              morePost(post.author);
            }}
            className="back"
          >
            More Posts By Similar Author
          </button>
        </div>
      </div>

      <div className="image">
        <Link to={`/post/${post.id}`}>
          <img
            src={post.image_url}
            alt={post.title}
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
