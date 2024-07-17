import { createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser : (state,action)=>{
            state.user = action.payload
            // // console.log("user: ",state.user);
        }
    }
})

export const anonymousUserIdSlice = createSlice({
    name: "anonymousUserId",
    initialState: {
        anonymousUserId: null
    },
    reducers: {
        setanonymousUserId : (state,action)=>{
            state.anonymousUserId = action.payload
        }
    }

})

export const {setUser} = userSlice.actions 
export const {setanonymousUserId} = anonymousUserIdSlice.actions