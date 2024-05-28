import { createSlice } from "@reduxjs/toolkit";



const filterSlice = createSlice({
    name: "filter",
    initialState: {
        country: null,
        city: null,
        town: null,
        district: null,
        institution: null,
        operation: null,
        suboperation: null,
        listFilters: false
    },
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setTown: (state, action) => {
            state.town = action.payload
        },
        setDistrict: (state, action) => {
            state.district = action.payload
        },
        setInstitution: (state, action) => {
            state.institution = action.payload
        },
        setOperation: (state, action) => {
            state.operation = action.payload
        },
        setSubOperation: (state, action) => {
            state.suboperation = action.payload
        },
        setListFilters: (state, action) => {
            state.listFilters = action.payload
        },
        resetFilters: (state) => {
                state.country = null,
                state.city = null,
                state.town = null,
                state.district = null,
                state.institution = null,
                state.operation = null,
                state.suboperation = null
        },
    }
})

export default filterSlice.reducer
export const { setCity, setCountry, setInstitution, setOperation, setSubOperation, setTown, setListFilters, resetFilters,setDistrict } = filterSlice.actions