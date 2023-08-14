import { Link,Outlet, json, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";
import "./Home.css"
import PostItem from "./PostItem";


const Home = (props) => {
  const navigate=useNavigate();
  const [posts,setPosts]=useState([]);
  const [showPosts,setShowPosts]=useState([]);
  const [toggleSave,setToggleSave]=useState(false);
    useEffect(()=>{
        fetch('http://127.0.0.1:3000/?page=1&books_per_page=1000').then((response)=>{
        return response.json();
        }).then((data)=>{
          console.log(data);
            setPosts(data);
            setShowPosts(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

    const Recommend=()=>{
      if(props.authorization=="")
        {
            navigate('/login');
        }
        else{
          fetch('http://127.0.0.1:3000/profile',{ method: 'GET',
          headers: {
            'Authorization': props.authorization
          }
          }).then((response)=>{
      return response.json();
      }).then((profileinfo)=>{
        
          console.log(profileinfo);
          const str1 = profileinfo.interest;
          let temp1=posts.filter((val)=>{
            console.log(val);
            return (val.title.toLowerCase().includes(str1) || val.topic.toLowerCase().includes(str1) );
          })
          
          setShowPosts([...temp1]);
      })
      .catch((error)=>{
          console.log(error);
      })
        }
        
    }
  
    const Search=()=>{
      let temp2=posts;
      const strQ=document.getElementById("idSearch").value.toLowerCase();
      
      if(strQ=="")
      {
        setShowPosts(posts);
        return ;
      }
   console.log(posts)
      let temp=temp2.filter((val)=>{
        console.log(val);
        return (val.text.toLowerCase().includes(strQ)|| val.title.toLowerCase().includes(strQ) || val.author.toLowerCase().includes(strQ) || val.topic.toLowerCase().includes(strQ) );
      })
     
      setShowPosts([...temp]);

      }
  
      const filterByLikes=()=>{
        let temp2=posts;
        temp2.sort((a,b)=>{
          return b.likes.length>a.likes.length
        })
      
        setShowPosts([...temp2]);
      }

      const filterByViews=()=>{
        let temp2=posts;
        temp2.sort((a,b)=>{
          return b.views-a.views;
        })
        setShowPosts([...temp2]);
      }

      const filterByDate = () => {
        const selectedDate = new Date(document.getElementById("idDate").value);
      
        if (isNaN(selectedDate)) {
          // Invalid date input, show all posts
          setShowPosts([...posts]);
          return;
        }
      
        const filteredPosts = posts.filter((post) => {
          const postDate = new Date(post.created_at);
          return postDate >= selectedDate;
        });
      
        setShowPosts(filteredPosts);
      };
      



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
      setToggleSave(!toggleSave);
    }).catch((err)=>{
      console.log(err);
    })
  }
  }
  const morePost=(author)=>{
    navigate(`/postsSimilar/${author}`);
}

  return (
    <div>
      
      <div className="search_and_filter_container">
  <div className="search_bar">
    <input type="text" id="idSearch" placeholder="Search..." />
    <button onClick={() => { Search() }} id="search_btn">Search</button>
  </div>
  <div className="filter_bar">
    <div className="sort_buttons">
      <label>Sort by</label>
      <button onClick={() => { filterByLikes() }}>Likes</button>
      <button onClick={() => { filterByViews() }}>Views</button>
    </div>
    {props.authorization && (
      <div className="other_buttons">
        <button onClick={() => { filterByViews() }}>Top Posts</button>
        <button onClick={() => { Recommend() }}>Recommended Posts</button>
      </div>
    )}
    <div className="filter_by_date">
      <label>Filter by</label>
      <input type="date" id="idDate" onChange={() => { filterByDate() }} />
    </div>
  </div>
</div>

     
      
      <div>
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
         
    </div>
  );
};

export default Home;
