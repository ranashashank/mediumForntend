import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {

    if(props.authorization=="")
    {
       
        navigate('/login');
    }
    else
    {
   
     fetch("http://127.0.0.1:3000/logout",{ method: 'DELETE',
    headers: {
      'Authorization': localStorage.Authorization
    }
    })
.then(response => {
return response.json()} )
.then(data => {
console.log(data);
localStorage.removeItem('Authorization');
navigate('/');
props.setAuthorization("");

})
.catch(error => {
    console.error('Error:', error);
});

    }
  }
    ,[]);
};

export default Signout;