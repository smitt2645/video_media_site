import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApi } from "../../api/apiInstance";

// const { createSlice } = require("@reduxjs/toolkit");

const initialUser = {
    user:null,
    loading:false,
    error:null
};

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async(payload,{rejectWithValue})=>{
        try {
            const userProfileRes = await baseApi.get("/v1/user/get-profile");
            return userProfileRes.data;
        } catch (error) {
            console.log(error);
        }
    }
)
const userSlice = createSlice({
    name:"user",
    initialState:initialUser,
    reducers:{
        getUser:(state,action)=>{
            state.user = action.payload.user,
            state.loading = action.payload.loading
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.loading = false
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.user = null,
            state.loading = false,
            state.error = action.payload.error
        })
    }

});

export const {getUser} = userSlice.actions;
export default userSlice.reducer;