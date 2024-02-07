import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        isGuest: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setGuest: (state, action) => {
            state.isGuest = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUser, setGuest, setLoggedIn } = userSlice.actions
