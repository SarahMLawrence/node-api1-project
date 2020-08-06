import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import { useHistory, Link} from "react-router-dom";

const UserList = props => {
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
    console.log("deleting", id);
    Axios()
      .delete(`/users/${id}`)
      .then((res) => {
        console.log({ res });
        setUser(res.data);
        push("/user-list");
        window.location.reload(false);
      })
      //.then((res) => setUser(res.data); push("/item-list");)
      .catch((err) => console.log(err));
  };

  //--------------------//
  //     EDIT USER      //
  //--------------------//

  return (
    <div className="main">
      {users ? (
        users.map((user) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content">
                  <h3 className="card-title">Name: {user.name}</h3>
                  <p className="card-text">
                    {user.id}
                    <br></br>
                    Bio: {user.bio}
                  </p>
                  <button onClick={(e) => deleteUser(e, user.id)}>
                    Delete
                  </button>

                  <button> <Link to={`/update-user/${user.id}`} >Edit</Link></button>
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
