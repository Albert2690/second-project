import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null
}

const authSlice = createSlice({
   name:'userAuth',
   initialState,
   reducers :{
    setCredentials:(state,action)=>{
        state.userInfo = action.payload
        localStorage.setItem('userInfo',JSON.stringify(action.payload))
    },
    logout:(state,action)=>{
        state.userInfo = null
        localStorage.removeItem('userInfo')
    }
   
   }
})

export  const {setCredentials,logout} = authSlice.actions
export default authSlice.reducer