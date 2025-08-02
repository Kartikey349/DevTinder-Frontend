import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeRequest } from "../utils/requestSlice";

const ConnectionCard = ({data}) => {

    const dispatch = useDispatch();

    const reviewRequest = async (status, requestId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {} ,{
                withCredentials: true
            })
            dispatch(removeRequest(requestId))
        }catch(err){
            console.log(err.response.data)
        }
    }

    return <div className="card card-side bg-base-300 shadow-sm w-4/12">
                <figure>
                    <img
                        src={data?.fromUserId.photoUrl}
                    alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{data?.fromUserId.firstName}  {data?.fromUserId.lastName}</h2>
                    <p>{data?.fromUserId.about}</p>
                    <p>{data?.fromUserId.age}, {data?.fromUserId.gender}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary"
                        onClick={() => reviewRequest("accepted", data._id )}
                        >Accept</button>
                        <button className="btn btn-primary"
                        onClick={() => reviewRequest("rejected", data._id )}
                        >Reject</button>
                    </div>
                </div>
            </div>
}

export default ConnectionCard