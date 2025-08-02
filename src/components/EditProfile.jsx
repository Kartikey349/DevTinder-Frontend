import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || ""); 
    const [about, setAbout] = useState(user?.about || ""); 
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl)
    const [error, setError] = useState("")
    const dispatch  = useDispatch();


    const updateProfile = async () => {
        try{
            const res = await axios.patch( BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            }, {
                withCredentials:true
            })
            dispatch(addUser(res.data.data))
        }catch(err){
            console.log(err)
            setError(err.response.data)
        }
    } 


    return(
        <div className="flex justify-center gap-10">
            <div className="card card-border bg-base-300 w-96 flex">
                <div className="card-body">
                    <h2 className="card-title mx-auto my-0 leading-0">Profile Edit!</h2>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">FirstName</legend>
                            <input type="text" className="input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value) }
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">LastName</legend>
                            <input type="text" className="input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value) }
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input"
                            value={age}
                            onChange={(e) => setAge(e.target.value) }
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input"
                            value={gender}
                            onChange={(e) => setGender(e.target.value) }
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input"
                            value={about}
                            onChange={(e) => setAbout(e.target.value) }
                            />
                        </fieldset>
                    </div>

                    <div>
                        <fieldset className="fieldset leading-1.5">
                            <legend className="fieldset-legend">PhotoUrl</legend>
                            <input type="text" className="input"

                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value) }
                            />
                        </fieldset>
                    </div>
                   <p className="text-red-500">{error}</p>

                    <div className="card-actions justify-center leading-1.5">
                        <button className="btn btn-primary" onClick={updateProfile}
                        >Save Profile</button>
                    </div>
                </div>
            </div>
             <Card users={{firstName, lastName, photoUrl, age, gender, about}} />
        </div>
    )
}

export default EditProfile;