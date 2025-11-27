import {createSlice,nanoid} from "@reduxjs/toolkit";
// import { getUser } from "../../api/auth/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit"
import {baseApi} from "../../api/apiInstance";

export const getUser = createAsyncThunk(
  'auth/getUser',  // ← This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    // Your async logic
    console.log("credentials",credentials)
    try {
        const fetchUser = baseApi.get("/v1/user/get-user");
        // console.log((await fetchUser).data)
        console.log("(await fetchUser).data::",(await fetchUser).data)
    return (await fetchUser).data;
        } catch (error) {
        console.log("error:",error)
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    console.log("credentials:", credentials);

    try {
      const response = await baseApi.post("/v1/user/login", credentials);
      console.log("login:", response.data);
      return response.data;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const register = createAsyncThunk(
  'auth/register',  // ← This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    // Your async logic
    console.log("credentials:",credentials)
    try {
        const register = baseApi.post("/v1/user/register",credentials);
        // console.log((await fetchUser).data)
        console.log("register :",(await register).data)
        return (await register).data
        } catch (error) {
        console.log("error:",error)
    }
  }
);

const initialState = {
    user:null,
    token:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    success:false       
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
      registerUser:(state,action)=>{
        
      },
        loginUser:(state,action)=>{
          console.log("action.payload",action.payload)
          const {user,success,token} = action.payload;
          console.log("user Payload:",user)
            state.user = user;
            state.isAuthenticated = true;
            state.success = success
            state.token = token 
            localStorage.setItem("token",token);
          },
          logoutUser:(state,action)=>{
              
          },
    },
  
});



export const {loginUser,logoutUser,registerUser} = authSlice.actions;
export default authSlice.reducer;