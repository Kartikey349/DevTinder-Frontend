import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isLogin, setIsLogin] = useState(true)
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

    const handleSignup = async () => {
        try{
            const user = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password
            }, {
                withCredentials:true
            })
            
            dispatch(addUser(user.data.data))
            navigate("/profile")
        }catch(err){
            setError(err?.response?.data)
        }
    }

    return(
        <div className="flex justify-center mt-20">
            <div className="card card-border bg-base-300 w-96 flex">
                <div className="card-body">
                    <h2 className="card-title mx-auto">{isLogin ? "Login!" : "Signup"}</h2>

                  {!isLogin && <><div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">FirstName</legend>
                            <input type="text" className="input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">LastName</legend>
                            <input type="text" className="input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    </>
                }

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
                            onClick={isLogin ? handleLogin : handleSignup}
                        >{isLogin ? "Login" : "Signup"}</button>
                    </div>

                    <p className="my-3 cursor-pointer m-auto" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "New User? Sign Up" : "Existing User? Login Here"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login;