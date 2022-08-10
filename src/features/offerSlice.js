import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addOffer = createAsyncThunk("offer/addOffer", async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      `https://dummyprojectbinar.herokuapp.com/offer/buyer/add-offer/${data.path.userId}/${data.path.productId}?offer_price=${data.data.offer_price}&offerStatus=${data.data.offerStatus}`,
      data.data,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    console.log(response, "add offer");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

export const getBuyerOfferHistory = createAsyncThunk(
  "offer/getBuyerOfferHistory",
  async (userId) => {
    console.log(userId);
    try {
      const response = await axios.get(
        `https://dummyprojectbinar.herokuapp.com/offer/buyer/get-offer-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "get buyer offer history");
      return response.data.sort((a, b) => b.offerId - a.offerId);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getSellerOfferHistory = createAsyncThunk(
  "offer/getSellerOfferHistory",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.get(
        `https://dummyprojectbinar.herokuapp.com/offer/seller/get-offer-history/${data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "get seller offer history");
      return response.data.sort((a, b) => b.offerId - a.offerId);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getSellerOfferDetail = createAsyncThunk(
  "offer/getSellerOfferDetail",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.get(
        `https://dummyprojectbinar.herokuapp.com/offer/get-detail-offer/${data.offerId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "get seller offer detail");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const sellerAcceptedOffer = createAsyncThunk(
  "offer/sellerAcceptedOffer",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://dummyprojectbinar.herokuapp.com/offer/seller/accepted-status/${data}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "seller accepted offer");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const sellerRejectedOffer = createAsyncThunk(
  "offer/sellerRejectedOffer",
  async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://dummyprojectbinar.herokuapp.com/offer/seller/rejected-status/${data}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response, "seller rejected offer");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  addOfferStatus: "",
  buyerOfferHistoryData: [],
  buyerOfferHistoryStatus: "",
  sellerOfferHistoryData: [],
  sellerOfferHistoryStatus: "",
  sellerOfferDetailData: [],
  sellerOfferDetailStatus: "",
  sellerAcceptedOfferStatus: "",
  sellerRejectedOfferStatus: "",
  error: "",
};

const offerSLice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    clearStatusOffer: (state) => {
      state.sellerAcceptedOfferStatus = "";
      state.sellerRejectedOfferStatus = "";
      state.addOfferStatus = "";
    },
  },
  extraReducers: {
    // addOffer
    [addOffer.pending]: (state) => {
      state.addOfferStatus = "loading";
    },
    [addOffer.fulfilled]: (state, action) => {
      state.addOfferStatus = "success";
    },
    [addOffer.rejected]: (state) => {
      state.addOfferStatus = "rejected";
    },
    // buyer-offer-history
    [getBuyerOfferHistory.pending]: (state) => {
      state.buyerOfferHistoryStatus = "loading";
    },
    [getBuyerOfferHistory.fulfilled]: (state, action) => {
      state.buyerOfferHistoryStatus = "success";
      state.buyerOfferHistoryData = action.payload;
    },
    [getBuyerOfferHistory.rejected]: (state) => {
      state.buyerOfferHistoryStatus = "rejected";
    },
    // seller-offer-history
    [getSellerOfferHistory.pending]: (state) => {
      state.sellerOfferHistoryStatus = "loading";
    },
    [getSellerOfferHistory.fulfilled]: (state, action) => {
      state.sellerOfferHistoryStatus = "success";
      state.sellerOfferHistoryData = action.payload;
    },
    [getSellerOfferHistory.rejected]: (state) => {
      state.sellerOfferHistoryStatus = "rejected";
    },
    // seller-offer-detail
    [getSellerOfferDetail.pending]: (state) => {
      state.sellerOfferDetailStatus = "loading";
    },
    [getSellerOfferDetail.fulfilled]: (state, action) => {
      state.sellerOfferDetailStatus = "success";
      state.sellerOfferDetailData = action.payload;
    },
    [getSellerOfferDetail.rejected]: (state) => {
      state.sellerOfferDetailStatus = "rejected";
    },
    // seller acc offer
    [sellerAcceptedOffer.pending]: (state) => {
      state.sellerAcceptedOfferStatus = "loading";
    },
    [sellerAcceptedOffer.fulfilled]: (state) => {
      state.sellerAcceptedOfferStatus = "success";
    },
    [sellerAcceptedOffer.rejected]: (state) => {
      state.sellerAcceptedOfferStatus = "rejected";
    },
    // seller reject offer
    [sellerRejectedOffer.pending]: (state) => {
      state.sellerRejectedOfferStatus = "loading";
    },
    [sellerRejectedOffer.fulfilled]: (state) => {
      state.sellerRejectedOfferStatus = "success";
      state.sellerAcceptedOfferStatus = "";
    },
    [sellerRejectedOffer.rejected]: (state) => {
      state.sellerAcceptedOfferStatus = "rejected";
    },
  },
});

export const getAddOfferStatus = (state) => state.offer.addOfferStatus;
export const getBuyerOfferHistoryData = (state) =>
  state.offer.buyerOfferHistoryData;
export const getBuyerOfferHistoryStatus = (state) =>
  state.offer.buyerOfferHistoryStatus;
export const getSellerOfferHistoryData = (state) =>
  state.offer.sellerOfferHistoryData;
export const getSellerOfferHistoryStatus = (state) =>
  state.offer.sellerOfferHistoryStatus;
export const getSellerOfferDetailData = (state) =>
  state.offer.sellerOfferDetailData;
export const getSellerOfferDetailStatus = (state) =>
  state.offer.sellerOfferDetailStatus;
export const getSellerAcceptedOfferStatus = (state) =>
  state.offer.sellerAcceptedOfferStatus;
export const getSellerRejectedOfferStatus = (state) =>
  state.offer.sellerRejectedOfferStatus;

export const { clearStatusOffer } = offerSLice.actions;
export default offerSLice.reducer;
