import { useEffect, useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import PostItem from "./PostItem";



const AuthorProfile=(props)=>{

    const {username}=useParams();
    const navigate=useNavigate();
   const [info,setInfo]=useState([]);
   const [posts,setPosts]=useState([]);

    useEffect(()=>{
        
        if(!localStorage.hasOwnProperty('Authorization'))
        {
           
            navigate('/login');
        }
        else
        {
            
            fetch(`http://127.0.0.1:3000/author/?username=${username}`,{ method: 'GET',
            headers: {
              'Authorization': localStorage.Authorization
            }
            }).then((response)=>{
        return response.json();
        }).then((data)=>{
          
            console.log(data);
            setInfo([data])
          
        })
        .catch((error)=>{
            console.log(error);
        });
        fetch('http://127.0.0.1:3000/?page=1&books_per_page=1000')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const authorPosts = data.filter((post) => post.author === username);
      setPosts(authorPosts);
      console.log(authorPosts);
    })
    .catch((error) => {
      console.log(error);
    });
        }
    },[username])


 
    return (
        <div>
        
           <h1 style={{textAlign:"center"}}>Author Profile</h1>
           {
            info.map((val,idx)=>{
                return  <div key={idx}>
                   <h3>Profile views: <span>{val.profile_views}</span></h3>
                   <h3>UserName: <span>{val.username}</span></h3>
                   <h3>Interests: <span>{val.interests}</span></h3>
                   <h3>Speciality: <span>{val.speciality}</span></h3>
                   <h3>Articles: <span>{val.articles.length}</span></h3>
               </div>
            })
           }
          <div>
        {
          posts.map((post,idx)=>{
            console.log(post);
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
          })}
        </div>   
        </div>)
    
}

export default AuthorProfile;