import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { getUser } from "../../api/auth/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "../../api/apiInstance";

export const getUser = createAsyncThunk(
  "auth/getUser", // ← This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    // Your async logic
    console.log("credentials", credentials);
    try {
      const fetchUser = baseApi.get("/v1/user/get-user");
      // console.log((await fetchUser).data)
      console.log("(await fetchUser).data::", (await fetchUser).data);
      return (await fetchUser).data;
    } catch (error) {
      console.log("error:", error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    console.log("credentials:", payload);
    const { username, password } = payload;
    try {
      const response = await baseApi.post("/v1/user/login", {
        username,
        password,
      });
      console.log("login:", response.data);
      return response.data;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register", // ← This is the action type prefix
  async (credentials, { rejectWithValue }) => {
    // Your async logic
    console.log("credentials:", credentials);
    try {
      const register = baseApi.post("/v1/user/register", credentials);
      // console.log((await fetchUser).data)
      console.log("register :", (await register).data);
      return (await register).data;
    } catch (error) {
      console.log("error:", error);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: (state, action) => {
      (state.user = null), (state.isAuthenticated = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // const {} = action.payload;
        console.log("action.payload=====>>>>>", action?.payload?.data);
        state.user = action.payload?.data?.user || null;
        (state.loading = false),
          (state.error = null),
          (state.isAuthenticated = true);
        (state.success = true),
          (state.token = action.payload?.data?.generateAccessToken || null);
        localStorage.setItem(
          "token",
          action.payload?.data?.generateAccessToken || null
        );
      })
      .addCase(login.rejected, (state, action) => {
        const { error } = action.payload;
        state.error = error;
        (state.isAuthenticated = false),
          (state.loading = false),
          (state.success = false),
          (state.user = null);
      });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
