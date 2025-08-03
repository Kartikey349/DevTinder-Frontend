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
    const [showToast, setShowToast] = useState(false)


    const updateProfile = async () => {
        setError("")
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
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false)
            },3000)
        }catch(err){
            setError(err.response.data)
        }
    } 


    return(
        <div className="container mx-auto px-4 ">
            <div className="flex flex-col-reverse items-center md:flex md:flex-row md:justify-center mb-20 gap-5 md:gap-10">
            <div className="card card-border bg-base-300 min-w-[350px] w-9/12 sm:w-7/12 md:w-3/12">
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

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>
                        <select
                            className="select select-bordered"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option disabled value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>    

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend leading-1.5">About</legend>
                        <textarea className="textarea h-24" placeholder="About" value={about}
                            onChange={(e) => setAbout(e.target.value) }></textarea>
                    </fieldset>


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

        {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile;