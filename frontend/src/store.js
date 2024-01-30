import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import adminReducer from './slices/adminAuthSlice'
import doctorReducer from './slices/doctorAuth'

import { apiSlice } from './slices/apiSlice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        doctor:doctorReducer,
        [apiSlice.reducerPath]:apiSlice.reducer

    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store