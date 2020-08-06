import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Axios }from "../utils/Axios";



const UserUpdate = (props) => {
  const [userUpdate, setUserUpdate] = useState({
      id: "",
      name: "",
      bio: "",
  });
  const { push } = useHistory;
  const { id } = useParams;

  useEffect(() => {
    Axios()
      .get(`/users/${id}/`)
      .then((res) => {
        setUserUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (ev) => {
    ev.persist();
    let value = ev.target.value;
    setUserUpdate({
      ...userUpdate,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios()
      .put(`/users/${id}`, userUpdate)
      .then((res) => {
        console.log("Response: ", res.data);
        props.setUserUpdate(res.data);
        push(`/user-list/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1> Update User </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="name"
          value={userUpdate.name}
        />

        <div className="baseline" />

        <input
          type="text"
          name="bio"
          onChange={handleChange}
          placeholder="bio"
          value={userUpdate.bio}
        />
        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};
export default UserUpdate;
