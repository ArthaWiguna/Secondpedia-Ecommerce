import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ADLI START
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (data) => {
    console.log(data, "id");
    try {
      const response = await axios.get(
        ` https://dummyprojectbinar.herokuapp.com/users/seller/get-user-detail/${data}`,
        // `https://dummyprojectbinar.herokuapp.com/users/get-user-detail/${id}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "get user by id");
      return response.data[0];
    } catch (error) {
      console.log(error.message, "gagal mendapatkan data");
    }
  }
);

export const userEdit = createAsyncThunk("auth/userEdit", async (data) => {
  try {
    const response = await axios.post(
      `https://dummyprojectbinar.herokuapp.com/users/public/update-users-profile`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    console.log(response, "data berhasil diupdate");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});
// ADLI END

const initialState = {
  detailUser: [],
  userUpdate: [],
  getUserStatus: "",
  getUserUpdateStatus: "",
  erorr: "",
  succesMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStatusUpdateProfile: (state) => {
      state.getUserUpdateStatus = "";
    },
  },
  extraReducers: {
    // get user by id
    [getUserById.pending]: (state) => {
      state.getUserStatus = "loading";
    },
    [getUserById.fulfilled]: (state, action) => {
      state.getUserStatus = "success";
      state.detailUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [getUserById.rejected]: (state) => {
      state.getUserStatus = "rejected";
    },
    // user edit
    [userEdit.pending]: (state) => {
      state.getUserUpdateStatus = "loading";
    },
    [userEdit.fulfilled]: (state, action) => {
      state.getUserUpdateStatus = "success";
      state.userUpdate = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [userEdit.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export const detailUser = (state) => state.user.detailUser;
export const getuserUpdate = (state) => state.user.userUpdate;
export const getuserUpdateStatus = (state) => state.user.getUserUpdateStatus;

export const { clearStatusUpdateProfile } = userSlice.actions;
export default userSlice.reducer;
