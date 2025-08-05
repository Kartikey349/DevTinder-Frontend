import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection)

    const fetchConnections = async () => {
    try {
        const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
        });
        dispatch(addConnection(res.data.data))
    } catch (err) {
            console.error("Error fetching connections:", err.response?.data || err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections) return;

    return <div className="flex flex-col items-center gap-2 mb-20">
        <h1 className="text-2xl font-bold my-8">Connections</h1>
        {connections.map((connection) => {
            const {firstName, lastName, age, gender, about, _id} = connection;

            return(
                <div key={_id} className="card bg-base-300 image-full w-96 h-50 shadow-sm overflow-hidden">
                <figure>
                    <img
                    src={connection?.photoUrl}
                    alt="profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName} {lastName}</h2>
                    <p className="line-clamp-2">{about}</p>
                    <p>{age}, {gender}</p>
                    <div className="card-actions justify-end">
                       <Link to={"/chat/" + _id}> <button className="btn btn-primary">Message</button></Link>
                    </div>
                </div>
                </div>
            )
        })}
    </div>
}

export default Connections