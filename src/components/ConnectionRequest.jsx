import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addRequest}from "../utils/requestSlice"
import ConnectionCard from "./ConnectionCard";

const ConnectionRequest = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request)

    const fetchrequests = async () => {
        if(requests) return;
        const res = await axios.get(BASE_URL +"/user/request/received", {
            withCredentials: true
        });
        dispatch(addRequest(res.data.data))
    }

    useEffect(() => {
        fetchrequests()
    }, [])

    if(!requests) return;

    if(requests.length === 0) <h1>No Requests Found</h1>

    return <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold my-8 ">Connection Requests</h1>
        {
            requests.map((request) => <ConnectionCard key={request.fromUserId._id} requests={request.fromUserId} /> )
        }
        
    </div>
}

export default ConnectionRequest;