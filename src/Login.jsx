import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [emailId, setEmailId] = useState("kartikey@gmail.com");
    const [password, setPassword] = useState("Sagar#123")

    const handleLogin = async () => {
        await axios.post("http://localhost:7000/login", {
            emailId,
            password
        }, {
            withCredentials: true
        })
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