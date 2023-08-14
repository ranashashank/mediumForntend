import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostItem from './PostItem';


const SavedPost = (props) => {
    const navigate=useNavigate();
    const [showPosts, setShowPosts] = useState([]);

  useEffect(() => {
    if (props.authorization) {
      fetchSavedPosts();
    } else {
      navigate('/login');
    }
  }, [props.authorization]);

  const fetchSavedPosts = () => {
    axios.get('http://127.0.0.1:3000/profile', {
      headers: {
        Authorization: localStorage.Authorization,
      },
    })
    .then((res) => {
      const savedPostIds = res.data.saved_posts;
      axios.get('http://127.0.0.1:3000/?page=1&books_per_page=100000')
      .then((response) => {
        const allPosts = response.data;
        const savedPosts = allPosts.filter((post) => savedPostIds.includes(post.id));
        setShowPosts(savedPosts);
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const savedForLater = (post) => {
    if (props.authorization) {
      axios.get(`http://127.0.0.1:3000/save/?id=${post.id}`, {
        headers: {
          Authorization: localStorage.Authorization,
        },
      })
      .then((res) => {
        console.log(res);
        fetchSavedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      navigate('/login');
    }
  };

  const morePost = (author) => {
    navigate(`/postsSimilar/${author}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 >Saved Posts</h1>
      {showPosts.map((post, idx) => (
        <PostItem
          key={post.id}
          post={post}
          savedForLater={savedForLater}
          morePost={morePost}
          removeS={true}
        />
      ))}
    </div>
  );
};

export default SavedPost