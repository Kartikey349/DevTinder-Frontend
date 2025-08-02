import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import requestReducer from "./requestSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer
    }
})

export default appStore;