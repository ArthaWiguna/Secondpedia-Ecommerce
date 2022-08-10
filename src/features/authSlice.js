import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://dummyprojectbinar.herokuapp.com/api/auth/signin`,
        data
      );
      console.log(response, "login slice");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://dummyprojectbinar.herokuapp.com/api/auth/signup`,
        data
      );
      console.log(response, "register slice");
      return response.data.message;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  user: {},
  status: "",
  role: "",
  erorr: "",
  succesMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // login
    [userLogin.pending]: (state) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "successLogin";
      state.user = action.payload;
      console.log(action.payload, "di reducer");
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    [userLogin.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    // register
    [userRegister.pending]: (state) => {
      state.status = "loading";
    },
    [userRegister.fulfilled]: (state, action) => {
      state.status = "successRegister";
      state.succesMessage = action.payload;
    },
    [userRegister.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const getUser = (state) => state.auth.user;
export const getStatus = (state) => state.auth.status;
export const getErorrMessage = (state) => state.auth.error;
export const getSuccesMessage = (state) => state.auth.succesMessage;
export default authSlice.reducer;
