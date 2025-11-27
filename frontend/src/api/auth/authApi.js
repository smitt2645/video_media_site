import { createAsyncThunk } from "@reduxjs/toolkit"
import {baseApi} from "../apiInstance";

export const getUser = createAsyncThunk(
  'auth/getUser',  // ← This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    // Your async logic
    console.log("credentials",credentials)
    try {
        const fetchUser = baseApi.get("/v1/user/get-user",credentials);
        console.log((await fetchUser).data)
        console.log("(await fetchUser).data::",(await fetchUser).data)
        return (await fetchUser).data;
        } catch (error) {
        console.log("error:",error)
    }
  }
);
