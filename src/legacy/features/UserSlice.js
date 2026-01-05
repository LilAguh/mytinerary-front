import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    id: null,
    mail: null,
    name:null,
    lastName: null,
    photo: null,
    role: null,
    logged: false,
    country: false
}

const userSlice = createSlice ({
    name:"userr",

    initialState, 

    reducers:{
        setCredentials: ( state, action) => {
            state.id     = action.payload.id
            state.mail   = action.payload.mail
            state.name   = action.payload.name
            state.lastName   = action.payload.lastName
            state.photo  = action.payload.photo
            state.role   = action.payload.role
            state.logged = action.payload.logged
            state.country = action.payload.country
        },
        deleteCredentials: (state, action) => {
            state.id         = null
            state.mail       = null
            state.name       = null
            state.lastName   = null
            state.photo      = null
            state.role       = null
            state.logged     = false
            state.country    = null
        }
    }

})

export const { setCredentials, deleteCredentials } = userSlice.actions

export default userSlice.reducer