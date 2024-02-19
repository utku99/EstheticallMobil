import { createSlice } from "@reduxjs/toolkit";

const comonSlice = createSlice({
    name: "common",
    initialState: {
        selectedService:null
    },
    reducers: {
        setSelectedService:(state,action)=>{
            state.selectedService=action.payload
        }
    }
})

export default comonSlice.reducer
export const {setSelectedService } = comonSlice.actions 