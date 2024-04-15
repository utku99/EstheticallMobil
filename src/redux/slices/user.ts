import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        isGuest: false,
        language:null,
        languages:null,
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
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setLanguages: (state, action) => {
            state.languages = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUser, setGuest, setLoggedIn,setLanguage,setLanguages } = userSlice.actions
