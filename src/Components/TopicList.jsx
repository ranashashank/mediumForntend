import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopicList.css"
import PostItem from "./PostItem";
import axios from "axios";
const Topiclist = (props) => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selectedTopic,setSelectedTopic]=useState("");
  const [showPosts,setShowPosts]=useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/?page=1&books_per_page=100000")
      .then((response) => response.json())
      .then((data) => {
        const uniqueTopicsSet = new Set();
       data.forEach((obj) => {
          uniqueTopicsSet.add(obj.topic);
        });
        const uniqueTopicsArray = Array.from(uniqueTopicsSet);
        setTopics(uniqueTopicsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const PostsByTopic=(element)=>{
    if(props.authorization==''){
      navigate("/login")
    }else{
   setSelectedTopic(element);
   console.log(element);
   fetch('http://127.0.0.1:3000/?page=1&books_per_page=1000').then((response)=>{
    return response.json();
    }).then((data)=>{
      const filteredPosts = data.filter((post) => post.topic === element);
        console.log(filteredPosts);
        setShowPosts([...filteredPosts]);
    })
    .catch((error)=>{
        console.log(error);
    })
  }
  }
  const savedForLater=(post)=>{
    if(props.authorization=="")
    {
      navigate("/login")
    }
    {
    axios.get(`http://127.0.0.1:3000/save/?id=${post.id}`,
    {
      headers:{
        Authorization:localStorage.Authorization
      }
    }
    ).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
  }
  const morePost=(author)=>{
    navigate(`/postsSimilar/${author}`);
}
  return (
    <div className="topic-list-container">
      <h1>List Of Topics</h1>
      <div className="topic-cards">
        {topics.map((element, index) => (
          <div key={index} className="topic-card">
            <h2>{element}</h2>
            <button  onClick={() => PostsByTopic(element)} className="topic-link">
              Explore more
            </button>
          </div>
        ))}
      </div>
        {
          showPosts.map((post,idx)=>{
            console.log(post);
            return (
              <PostItem
              key={post.id}
              post={post}
              savedForLater={savedForLater}
              morePost={morePost}
            />
            );
          })}
    </div>
  );
};

export default Topiclist;
