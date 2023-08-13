import { useEffect, useState } from "react";
import { useParams,useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
                            navigate('/signin');
                        }
                    })

        fetch(`http://127.0.0.1:3000/my_lists`, {
            headers: {
              'Authorization':localStorage.Authorization
              }
            })
        .then(response => {
        return response.json()} )
        .then(response => {
        setLists([...response]);

        
        })
        .catch(error => {
        console.error('Error:', error);
        });

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

const morePost=()=>{
    console.log(data[0].author)
    navigate(`/Similarpost/${data[0].author}`);
}

const Follow=()=>{
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
       
            ele.innerHTML="Following"
  
}




const Comment_post=()=>{
  
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


    return (
        <div>
           {/* <button onClick={()=>navigate(-1)} className="back">Back</button> */}
           
           {
             data.map((post,idx)=>{
                return <div key={idx}>
                    <div className="post_id">
                <h1 className="post_title">Post Title:{" "}{post.title}</h1>
               
                <img src={post.image_url} width={680} height={380} ></img>
                <p className="post_text">Post Text:{" "}{post.text}</p>
                <p className="post_topic">Post Topic:{" "}{post.topic}</p>
                </div>
                <div className="like_view">
                <button id="like" onClick={()=>{toggleLike()}} style={liked?{background:"red",color:"white"}:{background:"white",color:"black"}}  className="like">Like</button>
                <span className="show_count">{post.likes.length}</span>
                {/* <button id="comment">Comments</button>
                <span className="show_count">{post.comments.length}</span> */}
                <button id="views">Views</button>
                <span className="show_count">{post.views}</span>
                <p className="post_author">
                    <Link to={`/authorProfile/${post.author}`}>{post.author}</Link>
                    <button className="follow" id="follow" onClick={()=>{Follow()}}>
                        {following?"Following":"Follow"}
                        </button>
                        </p>
                <h3>Comments :{comments.length}</h3>
                {
                    comments.map((val)=>{
                        return <div>
                            {val.user}: {val.comment}
                        </div>
                    })
                }
                </div>
                
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <textarea rows="4" cols="50" id="comment_val" placeholder="Comment here..." onChange={(e)=>{setComment(e.target.value)}} value={comment}></textarea>
                <button onClick={()=>{Comment_post()}}>Submit</button>
                </div>
                </div>
             })
           }
            <div style={{margin:"20px",display:"flex"}}>
                <h4 style={{margin:"5px"}}>Add to your library</h4>
                {
                lists.map((list,idx)=>{
                    return <button key={idx} onClick={()=>{addtolist(list.id)}} id={list.id}>{list.name}</button>
                })
            }
            </div>
        
        
        </div>
    )
}

export default PostDetails;