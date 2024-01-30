import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
    adminInfo: localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}

const adminAuthSlice = createSlice({
    name:'adminauth',
    initialState,
    reducers:{
        setAdminCredentials:(state,action)=>{
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        Adminlogout:(state,action)=>{
            state.adminInfo=null
            localStorage.removeItem('adminInfo')
        }
    }

})


 export const {setAdminCredentials,Adminlogout}= adminAuthSlice.actions
export default adminAuthSlice.reducer