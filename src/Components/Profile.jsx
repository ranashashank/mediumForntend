import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (props.authorization === "") {
      navigate("/login");
    } else {
      fetch("http://127.0.0.1:3000/profile", {
        method: "GET",
        headers: {
          Authorization: props.authorization,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data);
          setEditedUser(data);
        })
        .catch((error) => {
          console.log(error);

          if (error === "Sign up or login") {
            navigate("/login");
          }
        });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    axios
      .patch("http://127.0.0.1:3000/profile_edit", editedUser, {
        headers: {
          Authorization: localStorage.Authorization,
        },
      })
      .then((data) => {
        setUser(editedUser);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-details">
        <p>
          Name:{" "}
          {editing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </p>

        <p>
          Topics:
          {editing ? (
            <input
              type="text"
              name="interest"
              value={editedUser.interest}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.interest}</span>
          )}
        </p>
        <p>
          Speciality:
          {editing ? (
            <input
              type="text"
              name="speciality"
              value={editedUser.speciality}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.speciality}</span>
          )}
        </p>
        {editing ? (
          <>
            <button onClick={saveChanges}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}

        <br />
        <br />
        <br />
        <p id="p_username">UserName: <span>{user.username}</span></p>
        <p>Account created on: {user.created_at?.substr(0, 10)}</p>
        <p>Articles: {user.articles?.length}</p>
        <h3>Follows: {user.follows?.length}</h3>
        <div>
          {user.follows?.map((x, idx) => {
            return <p key={idx}>{x}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
