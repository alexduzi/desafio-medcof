import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { create } from "domain";
import { jwtDecode } from "jwt-decode";

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

type AuthApiState = {
  user?: User | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("login", async (data: LoginData) => {
  const response = await axiosInstance.post("/login", data);
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  const user = jwtDecode(resData.accessToken) as User;

  return user;
});

export const register = createAsyncThunk("register", async (data: User) => {
  const response = await axiosInstance.post(
    "/register",
    data
  );
  const resData = response.data;

  return resData;
});

export const logout = createAsyncThunk("logout", async () => {
  
  localStorage.removeItem("userInfo");

  return null;
});

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/users/${userId}`
    );
    return response.data;
  }
);

export const cleanAuthState = createAsyncThunk("cleanState", async () => {
  return initialState;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cleanAuthState.fulfilled, (state) => {
        return initialState;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "idle";
          state.user = action.payload;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "idle";
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Get user profile data failed";
      });
  },
});

export default authSlice.reducer;