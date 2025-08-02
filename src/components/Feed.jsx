import axios from "axios";
import Card from "./Card";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addFeed} from "../utils/feedSlice"
import { useEffect, useState } from "react";

const Feed = () => {

    const dispatch = useDispatch();
    const [feed, setFeed] = useState([])

     useEffect(() => {
        fetchFeed();
    }, [])

    const fetchFeed = async () => {
        try{
            const feedData = await axios.get(BASE_URL+ "/user/feed", {
                withCredentials: true
            });
            dispatch(addFeed(feedData.data))
            setFeed(feedData.data)
        }catch(err){
            console.log(err)
        }
    }

    return <div className="flex justify-center mt-20">
        <Card users={feed[3]} />
    </div>
}

export default Feed;