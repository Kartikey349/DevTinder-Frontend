import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.user)

    const fetchProfile = async () => {
        try{
            if(user) return;
            const res = await axios.get(BASE_URL+ "/profile/view", {
                withCredentials: true
            })
    
            dispatch(addUser(res.data))
        }catch(err){
            if(err.status === 401){
                navigate("/login")
            }
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])


    return(
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body;