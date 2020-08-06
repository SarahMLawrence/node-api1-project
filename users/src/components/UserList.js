import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory } from 'react-router-dom';

const UserList = (props) => {
    const { push } = useHistory();
  const [users, setUser] = useState([]);

  //----------------//
  //   GET USERS    //
  //----------------//
  useEffect(() => {
    Axios()
      .get("/users")
      .then((res) => {
        console.log(res);
        setUser(res.data);
      });
  }, []);


  //-----------------//
  //   DELETE USER   //
  //-----------------//
  const deleteUser = (e, id) => {
      e.preventDefault();
      console.log("deleting", id );
      Axios()
      .delete(`/users/${id}`)
      .then(res => {
          console.log({res});
          setUser(res.data);
          push("/user-list");
          window.location.reload(false);
          
      })
      //.then((res) => setUser(res.data); push("/item-list");)
      .catch((err) => console.log(err));
  }

  return (
    <div className="main">
      {users ? (
        users.map((user) => {
          return (
            <div class="row">
              <div class="column">
                <div class="content">
                  <h3 className="card-title">Name: {user.name}</h3>
                  <p className="card-text">
                    {user.id}
                    <br></br>
                    Bio: {user.bio}
                  </p>
                  <button onClick={(e) => deleteUser(e, user.id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>HELLO USERS</h1>
      )}
    </div>
  );
};

export default UserList;
