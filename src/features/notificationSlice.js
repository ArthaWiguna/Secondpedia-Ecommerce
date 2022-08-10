import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserNotification = createAsyncThunk(
  "notification/getUserNotification",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.get(
        `https://dummyprojectbinar.herokuapp.com/notification/get-notification/${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "get user Notification");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateUserNotification = createAsyncThunk(
  "notification/updateUserNotification",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://dummyprojectbinar.herokuapp.com/notification/read/${data.notifId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "update user Notification");
      // return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  userNotification: [],
  getUserNotificationStatus: "",
  updateUserNotificationStatus: "",
  isAllRead: false,
  error: "",
};

const notificationSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearStatusNotification: (state) => {
      state.updateUserNotificationStatus = "";
    },
    checkAllNotificationRead: (state) => {
      const unread = state.userNotification.filter(
        (item) => item.isRead === false
      );
      console.log(unread);

      unread.length === 0
        ? (state.isAllRead = true)
        : (state.isAllRead = false);
    },
  },
  extraReducers: {
    // get notification
    [getUserNotification.pending]: (state) => {
      state.getUserNotificationStatus = "loading";
    },
    [getUserNotification.fulfilled]: (state, action) => {
      state.getUserNotificationStatus = "success";
      state.userNotification = action.payload.sort(
        (a, b) => b.notifId - a.notifId
      );
    },
    [getUserNotification.rejected]: (state) => {
      state.getUserNotificationStatus = "rejected";
    },
    // update notification
    [updateUserNotification.pending]: (state) => {
      state.updateUserNotificationStatus = "loading";
    },
    [updateUserNotification.fulfilled]: (state, action) => {
      state.updateUserNotificationStatus = "success";
    },
    [updateUserNotification.rejected]: (state) => {
      state.updateUserNotificationStatus = "rejected";
    },
  },
});

export const getUserNotificationData = (state) =>
  state.notification.userNotification;
export const getUserNotificationStatus = (state) =>
  state.notification.getUserNotificationStatus;
export const updateUserNotificationStatus = (state) =>
  state.notification.updateUserNotificationStatus;
export const allReadStatus = (state) => state.notification.isAllRead;

export const { clearStatusNotification, checkAllNotificationRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
