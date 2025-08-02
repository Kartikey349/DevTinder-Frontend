import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import requestReducer from "./requestSlice"
import connectionReducer from "./connectionSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer,
        connection: connectionReducer
    }
})

export default appStore;