import { useEffect, useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css"

const PostDetails=(props)=>{

    const [data,setData]=useState([]);
    const {id}=useParams();
    const [temp,setTemp]=useState([1]);
    const [lists,setLists]=useState([]);
    const [comment,setComment]=useState("");
    const [comments,setComments]=useState([]);
    const [user,setUser]=useState();
    const [following,setFollowing]=useState(false);
    const [liked,setLiked]=useState(false);
    const navigate=useNavigate();
    const[username,setCurrentUser]=useState("");
    
    
    useEffect(()=>{

        if(props.authorization=="")
        {
            navigate('/login');
        }
        else {
        fetch(`http://127.0.0.1:3000/details/?id=${id}`,{headers:{'Authorization':localStorage.Authorization}}).then((res)=>{
                    return res.json();
                    }).then((res)=>{
                       console.log(res);
                       console.log(res.author);
                       setCurrentUser(res.author);
                       if(res.message!=undefined )
                       {
                            navigate('/pay');
                       }
                       else
                       {
                           axios.get('http://127.0.0.1:3000/profile',{
                            headers:{
                                Authorization:localStorage.Authorization
                            }
                        }).then((res1)=>{
                            console.log(res1);
                            console.log(res1.data);
                             setCurrentUser(res1.data.username);
                            for(let i=0;i<res1.data.follows.length;i++)
                            {
                                if(res1.data.follows[i]==res.author)
                                {
                                    setFollowing(true);
                                }
                            }

                            for(let i=0;i<res.likes.length;i++)
                            {
                                if(res.likes[i]==res1.data.username)
                                {
                                    setLiked(true);
                                }
                            }
                            setData([res]);
                           setComments(res.comments);

                        })
                        .catch((err)=>{
                            console.log(err);
                        })

                       } 
                    })
                    .catch((error)=>{
                        
                        console.log(error);
                        if(error=="Sign up or login")
                        {
                            navigate('/login');
                        }
                    })

       
    }
    
},[temp])

const toggleLike=()=>{
    const ele=document.getElementById('like');
    console.log(data);
    fetch(`http://127.0.0.1:3000/like/?id=${data[0].id}`,{
        method: "POST",
        
        headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            'Authorization':localStorage.Authorization
            }
    }).then((res)=>{
                return res.json();
                }).then((res)=>{
                   setTemp([...temp])
                  
                })
                .catch((error)=>{
                    console.log(error);
                })
 if(ele.style.backgroundColor == "red")
 {
    ele.style.backgroundColor = "white";
    ele.style.color = "black";

 }
 else { ele.style.backgroundColor = "red";
    ele.style.color = "white";
    }

}


const followUser=()=>{
    const ele=document.getElementById("follow");
    console.log(data);
    if(data[0].author===username){
        return;
    }
    setFollowing(!following);

    
        fetch(`http://127.0.0.1:3000/follow/?username=${data[0].author}`,{
            method: "POST",
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Authorization':localStorage.Authorization
                }
        }).then((res)=>{
                    return res.json();
                    }).then((res)=>{
                       
                    setTemp([...temp])
                      
                    })
                    .catch((error)=>{
                        navigate('/login');
                        console.log(error);
                    })
       
           
  
}




const AddComment=()=>{
  
    axios.post('http://127.0.0.1:3000/comment',{
        id:id,
        comment:comment
    },
    {
        headers:{
            Authorization:localStorage.Authorization
        }
    }).then((res)=>{
        console.log(res);
        setComments(res.data.comments);
        setComment('');
    })
    .catch((err)=>{
        console.log(err);
    })
}

const morePost=(author)=>{
  navigate(`/postsSimilar/${author}`);
}
    return (
        <div>
         
        
           {
             data.map((post,idx)=>{

                return (  
                <div key={idx} className="post-details">
                <div className="post-header">
                <button
                  onClick={() => {
                    morePost(post.author);
                  }}>More Post By Author</button>
                  <h1 className="post-title">Post Title: {post.title}</h1>
                  <p>Reading Time: {post.reading_time_minute} minutes</p>
                  <img src={post.image_url} width={680} height={380} alt={post.title} className="post-image" />
                  <p className="post-text">Post Text: {post.text}</p>
                  <p className="post-topic">Post Topic: {post.topic}</p>
                </div>
                <div className="post-interactions">
                  <button
                    id="like"
                    onClick={toggleLike}
                    className={liked ? "like-button liked" : "like-button"}
                  >
                    Like
                  </button>
                  <span className="show-count">{post.likes.length}</span>
                  
                  <button id="views">Views</button>
                  <span className="show-count">{post.views}</span>
                  <p className="post-author">
                    <Link to={`/authorProfile/${post.author}`}>{post.author}</Link>
                    <button
                      className={following ? "follow-button following" : "follow-button"}
                      onClick={followUser}
                    >
                      {following ? "Following" : "Follow"}
                    </button>
                  </p>
                  <h3>Comments: {comments.length}</h3>
                  {comments.map((val, index) => {
                    return (
                      <div key={index}>
                        {val.user}: {val.comment}
                      </div>
                    );
                  })}
                </div>
                <div className="comment-box">
                  <textarea
                    rows="4"
                    cols="50"
                    id="comment_val"
                    placeholder="Comment here..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  ></textarea>
                  <button onClick={AddComment}>Submit</button>
                </div>
              </div>)
             })
           }
            
        
        </div>
    )
}

export default PostDetails;