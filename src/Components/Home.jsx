import { Link,Outlet, json, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";


const Home = (props) => {
  const navigate=useNavigate();
  const [posts,setPosts]=useState([]);
  const [showPosts,setShowPosts]=useState([]);
  const [toggleSave,setToggleSave]=useState(false);
    useEffect(()=>{
        fetch('http://127.0.0.1:3000/?page=1&books_per_page=100').then((response)=>{
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
    const Topiclist=()=>{
      navigate('/Topiclist');
    }
    const Search=()=>{
      let temp=posts;
      const str=document.getElementById("idSearch").value.toLowerCase();
      
      if(str=="")
      {
        setShowPosts(posts);
        return ;
      }

      let temp1=temp.filter((val)=>{
        console.log(val);
        return (val.text.toLowerCase().includes(str)|| val.title.toLowerCase().includes(str) || val.author.toLowerCase().includes(str) || val.topic.toLowerCase().includes(str) );
      })
     
      setShowPosts([...temp]);

      }
  
      const filterByLikes=()=>{
        let temp2=posts;
        temp2.sort((a,b)=>{
          if(a.likes.length>b.likes.length) return -1;
          return 1;
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

  const filterByDate=()=>{
  let str=document.getElementById("idDate").value;
  if(str=="")
  {
    setShowPosts([...posts]);
    return ;
  }
  str=new Date(str);
  let temp=posts.filter((val)=>{
    let x=new Date(val.created_at);
    return x>=str;
  })
 
  setShowPosts([...temp]);

  }
  const allSavedpost=()=>{
    
    if(props.authorization=="")
    {
      navigate("/login")
    }
    {

    

    axios.get('http://127.0.0.1:3000/profile',{
      headers:{
        Authorization:localStorage.Authorization
      }
    }).then((res)=>{
      const saved = [];
      console.log(res.data)
     
      for(let i=0;i<posts.length;i++)
      {
         for(let j=0;j<res.data.saved_posts.length;j++)
         {
          if(posts[i].id==res.data.saved_posts[j])
          {
            saved.push(posts[i]);
          }
         }
      }
      setShowPosts([...saved]);
      

    })
    .catch((err)=>{
      console.log(err);
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
      
      <div className="search_bar">
        <input type="text" id="idSearch" placeholder="Search..." />
        <button onClick={()=>{Search()}} id="search_btn">Search</button>
      </div>
      <div className="filter_bar" >
        <div>
        <label>Sort by</label>
        <button onClick={()=>{filterByLikes()}}>Likes</button>
        <button onClick={()=>{filterByViews()}}>Views</button>
        </div>
       { props.authorization && (<div>
       <button onClick={()=>{filterByViews()}}>Top Posts</button>
        <button onClick={()=>{Recommend()}}>Recommended Posts</button>
        <button onClick={()=>{Topiclist()}}>Topics List</button>
        <button onClick={()=>{allSavedpost()}}>Saved Post</button>
      
        </div>
        )
        }
        <div>
        <label>Filter by</label>
        <input type="date" id="idDate" onChange={()=>{filterByDate()}}/>
        </div>
        
      </div>
     
      
      <div>
        
        {
          showPosts.map((post,idx)=>{
            console.log(post);
            return <div className="post" key={post.id} style={{borderBottom:"2px solid black"}}>
                <div className="left">
                
                <Link to={`/post/${post.id}`} className="link"><h2 className="title">Title:{post.title}</h2></Link>
                <p className="author">{post.author}</p>
                <Link to={`/post/${post.id}`} className="link"><p className="text">Text:{post.text.substr(0,100)}</p></Link>
                <div className="lower">
                <p className="date">Date:{post.created_at.substr(0,10)}</p>
                <p className="topic">Topic:{post.topic}</p>
                <p>Reading Time: {post.reading_time_minute} minutes</p>
                <p>Likes:{post.likes.length}</p>
                <p>Views:{post.views}</p>
                
                <button onClick={()=>{savedForLater(post)}}> Save for later</button>
                <button onClick={()=>{morePost(post.author)}} className="back">More Post By Similar Author</button>
                </div>
                </div>
                
                 <Link to={`/post/${post.id}`}> <img src={post.image_url} width={200} height={150} ></img></Link>
                
              </div>
          })
        }
        </div>     
    </div>
  );
};

export default Home;
