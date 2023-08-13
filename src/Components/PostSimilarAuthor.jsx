import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostSimilarAuthor = (props) => {
    const {author}=useParams();
    const [posts,setPosts]=useState([]);
     const navigate=useNavigate();
     
     useEffect(()=>{
        if(props.authorization=="")
        {
            navigate('/login');
        }
        else{

        fetch('http://127.0.0.1:3000/?page=1&books_per_page=200').then((response)=>{
        return response.json();
        }).then((filterdata)=>{
            let arr=filterdata.filter((data1)=>{
                return (data1.author.toLowerCase().includes(author));
            })
           
            setPosts(arr);
            console.log(arr);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
     },[])
  return (
    <div>
    
    {
      posts.map((post,idx)=>{
        return <div className="post" key={idx}>
            <div className="left">
            <p className="author">{post.author}</p>
            <Link to={`/post/${post.id}`} className="link"><h2 className="title">{post.title}</h2></Link>
            <Link to={`/post/${post.id}`} className="link"><p className="text">{post.text.substr(0,200)}</p></Link>
            <div className="lower">
            <p className="date">{post.created_at.substr(0,10)}</p>
            <p className="topic">{post.topic}</p>
            </div>
            </div>
            
             <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
            
          </div>
      })
    }
    </div>
  )
}

export default PostSimilarAuthor