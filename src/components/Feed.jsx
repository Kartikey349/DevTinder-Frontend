import axios from "axios";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  
  const fetchFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData.data)); 
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0)
    return <h1 className="text-center mt-10 text-lg">No new users found!</h1>;

  return (
    <div className="flex justify-center mt-20 gap-4 flex-wrap">
        <Card users={feed[0]} />
    </div>
  );
};

export default Feed;
