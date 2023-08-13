import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topiclist = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/?page=1&books_per_page=100000")
      .then((response) => {
        return response.json();
      })
      .then((filterdata) => {
        console.log(filterdata);
        const uniqueTopicsSet = new Set();
        filterdata.forEach((obj) => {
          uniqueTopicsSet.add(obj.topic);
        });
        const uniqueTopicsArray = Array.from(uniqueTopicsSet);
        setTopics(uniqueTopicsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      
      <h1>List Of Topics</h1>
      <br></br>
      <div>
        <ol>
          {topics.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Topiclist;
