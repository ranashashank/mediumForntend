import React from 'react';
import { Link } from 'react-router-dom';
import './MyPostItem.css'; // Import the CSS file

const MyPostItem = ({ values, Edit, Delete }) => {
  return (
    <li id={values.id} className="list-post">
      <div className="post-content">
        <Link to={`/post/${values.id}`} className="link">
          <h3>Title: {values.title}</h3>
        </Link>
        <h4>Topic: <span>{values.topic.name}</span></h4>
        <p>{values.text.substr(0, 100)}</p>
        <p>Likes: {values.likes}</p>
        <p>Comments: {values.comments}</p>
        <p>Views: {values.views}</p>
        <div>
          <button onClick={() => { Edit(values.id) }}>Edit</button>
          <button onClick={() => { Delete(values.id) }}>Delete</button>
        </div>
      </div>
      <div className="post-photo">
        <img src={values.image_url} height={300} width={400} alt="Post Image" />
      </div>
    </li>
  );
};

export default MyPostItem;
