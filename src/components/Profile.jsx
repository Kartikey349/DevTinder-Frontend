import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";


const Profile = () => {
    const userData = useSelector((store) => store.user)

    return( 
    userData && (<div className="flex justify-center gap-10 items-center mt-5">
        <EditProfile user={userData} />
    </div>)
    )
}

export default Profile;