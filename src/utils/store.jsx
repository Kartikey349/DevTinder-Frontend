import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import requestReducer from "./requestSlice"
import connectionReducer from "./connectionSlice"
import feedReducer from "./feedSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer,
        connection: connectionReducer,
        feed: feedReducer
    }
})

export default appStore;