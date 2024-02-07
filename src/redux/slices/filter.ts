import { createSlice } from "@reduxjs/toolkit";



const filterSlice = createSlice({
    name: "filter",
    initialState: {
        country: null,
        city: null,
        town: null,
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
    }
})

export default filterSlice.reducer
export const { setCity, setCountry, setInstitution, setOperation, setSubOperation, setTown, setListFilters } = filterSlice.actions