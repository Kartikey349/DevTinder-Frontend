import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const Card = ({ users }) => {
    const dispatch = useDispatch();
    
    const sendRequest = async (status, userId) => {
    dispatch(removeFeed(userId))
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      });
    }
  catch(err){
    console.log(err.response.data)
  }
}
  

  if (!users) return null; 

  return (
    <div className="card bg-base-300 w-86 shadow-sm h-120">
      <figure>
        <img className="w-full" src={users?.photoUrl} alt="Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{users.firstName} {users.lastName}</h2>
        {(users.age && users.gender) && <p>{users.age}, {users.gender}</p> }
        <p className="line-clamp-2">{users.about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary"
          onClick={() => sendRequest("ignored", users._id)}
          >Ignore</button>
          <button className="btn btn-secondary"
          onClick={() => sendRequest("interested", users._id)}
          >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
