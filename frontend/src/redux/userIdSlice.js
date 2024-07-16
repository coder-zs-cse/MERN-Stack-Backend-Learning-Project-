import { createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "userId",
    initialState: {
        userId: null
    },
    reducers: {
        setUser : (state,action)=>{
            state.userId = action.payload
            // // console.log("user: ",state.user);
        }
    }
})

export const {setUser} = userSlice.actions 