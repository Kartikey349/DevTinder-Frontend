import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("kartikey@gmail.com");
    const [password, setPassword] = useState("Sagar#123")
    const [error, setError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const user = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, {
                withCredentials: true
            })
    
            dispatch(addUser(user.data))
            navigate("/");
        }catch(err){
            setError(err?.response?.data || "Something went wrong")
        }
    }

    return(
        <div className="flex justify-center mt-20">
            <div className="card card-border bg-base-300 w-96 flex">
                <div className="card-body">
                    <h2 className="card-title mx-auto">Login!</h2>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="text" className="input"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                   <h4 className="text-red-600">{error}</h4>

                    <div className="card-actions justify-center mt-2">
                        <button className="btn btn-primary"
                            onClick={handleLogin}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;