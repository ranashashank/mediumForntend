import React from 'react';
import { Link } from 'react-router-dom';
import './MyPostItem.css';

const MyPostItem = ({ values, Edit, Delete,idx }) => {
  return (
    <li id={values.id} className="list_post" key={idx} style={{ 
        border: "1px solid #ccc",
        padding: "20px",
        margin: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
    }}>
        <h3 style={{
            fontSize: "24px",
            marginBottom: "10px"
        }}>{values.title}</h3>
        <h4 style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#555"
        }}>Topic: <span style={{
            color: "#007bff"
        }}>{values.topic.name}</span></h4>
        <Link to={`/post/${values.id}`} className="link">
            <img src={values.image_url} height={300} width={400} style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                marginBottom: "10px"
            }} alt="Post Image" />
        </Link>
        <input style={{display:"none"}} type="file" accept="image/*" />
        <p style={{
            fontSize: "14px",
            lineHeight: "1.4",
            marginBottom: "10px"
        }}>{values.text.substr(0, 100)}</p>
        <p style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#555"
        }}>Likes: {values.likes}</p>
        <p style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#555"
        }}>Comments: {values.comments}</p>
        <p style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "#555"
        }}>Views: {values.views}</p>
        <div>
            <button onClick={()=>{Edit(values.id)}} style={{
                fontSize: "14px",
                padding: "5px 10px",
                margin: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer"
            }}>Edit</button>
            <button onClick={()=>{Delete(values.id)}} style={{
                fontSize: "14px",
                padding: "5px 10px",
                margin: "5px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer"
            }}>Delete</button>
        </div>
    </li>
    
  );
};

export default MyPostItem;
