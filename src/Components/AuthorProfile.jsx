import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";



const AuthorProfile=(props)=>{

    const {username}=useParams();
    const navigate=useNavigate();
   const [info,setInfo]=useState([]);

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
        })
        }
    },[])


 
    return (
        <div>
        
           <h1 style={{textAlign:"center"}}>Author Information</h1>
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
          
        </div>)
    
}

export default AuthorProfile;