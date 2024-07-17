import {configureStore} from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { userSlice } from "./userSlice"
import { anonymousUserIdSlice } from "./userSlice"

const rootReducer = combineReducers({
    user: userSlice.reducer,
    anonymousUserId: anonymousUserIdSlice.reducer
})

const store = configureStore({
    reducer: rootReducer

})

export default store