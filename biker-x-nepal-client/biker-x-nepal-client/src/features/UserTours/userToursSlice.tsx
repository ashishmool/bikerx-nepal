import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPurchasedTour, newPurchasedTour } from "../../moduls";

// Define your backend API base URL
const baseURL = "http://13.48.249.115:8080";

// Define interfaces for your data types
interface IUserTours {
  favoriteTours: {
    created_at: string;
    id: number;
    tour_id: number;
    user_id: number;
    tours_and_reviews: {
      cardImage: string;
      duration: string;
      name: string;
      price: number;
      title: string;
      avgreview: number;
      totalreviews: number;
    };
  }[];
  idFavoriteTours: { tour_id: number }[];
  purchasedTours: IPurchasedTour[];
  isRetrieving: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  isAdding: boolean;
  error: string;
  isConfirmingPurchase: boolean;
  isPurchasing: boolean;
}

// Define initial state
const initialState: IUserTours = {
  favoriteTours: [],
  idFavoriteTours: [],
  purchasedTours: [],
  isRetrieving: false,
  isDeleting: false,
  isUpdating: false,
  isAdding: false,
  error: "",
  isConfirmingPurchase: true,
  isPurchasing: false,
};

// Define async thunks for fetching data from the backend using Axios
export const retrieveFavoriteTours = createAsyncThunk(
    "userTours/retrieveFavoriteTours",
    async (user_id: string, thunkAPI) => {
      try {
        const response = await axios.get(`${baseURL}/favorites?user_id=${user_id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const deleteFavoriteTour = createAsyncThunk(
    "userTours/deleteFavoriteTour",
    async (
        { favorite_id, user_id }: { favorite_id: string; user_id: string },
        thunkAPI
    ) => {
      try {
        const response = await axios.delete(`${baseURL}/favorites/${favorite_id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const addPurchasedTour = createAsyncThunk(
    "userTours/addPurchasedTour",
    async (
        {
          id,
          user_id,
          date_id,
          numTravelers,
          isSuitPremium,
          totalPrice,
          tour_id,
        }: newPurchasedTour,
        thunkAPI
    ) => {
      try {
        const response = await axios.post(`${baseURL}/purchased_tours`, {
          id,
          user_id,
          date_id,
          numTravelers,
          isSuitPremium,
          totalPrice,
          tour_id,
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const deletePurchasedTour = createAsyncThunk(
    "userTours/deletePurchasedTour",
    async (
        { purchased_id, user_id }: { purchased_id: string; user_id: string },
        thunkAPI
    ) => {
      try {
        const response = await axios.delete(`${baseURL}/purchased_tours/${purchased_id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);



export const retrieveIdFavoriteTours = createAsyncThunk(
    "userTours/retrieveIdFavoriteTours",
    async (user_id: string, thunkAPI) => {
      try {
        const response = await axios.get(`${baseURL}/favorites/tour_ids?user_id=${user_id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const retrievePurchasedTours = createAsyncThunk(
    "userTours/retrievePurchasedTours",
    async (user_id: string, thunkAPI) => {
      try {
        const response = await axios.get(`${baseURL}/purchased_tours_full?user_id=${user_id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const updatePurchasedTour = createAsyncThunk(
    "userTours/updatePurchasedTour",
    async (
        {
          id,
          numTravelers,
          isSuitPremium,
          totalPrice,
          user_id
        }: {
          id:number,
          numTravelers:number,
          isSuitPremium:boolean,
          totalPrice:number,
          user_id:string
        },
        thunkAPI
    ) => {
      try {
        const { data, error } = await axios.put(`${baseURL}/purchased_tours/${id}`, {
          numTravelers,
          isSuitPremium,
          totalPrice,
        });
        if (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        thunkAPI.dispatch(retrievePurchasedTours(user_id));
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const addFavoriteTour = createAsyncThunk(
    "userTours/addFavoriteTour",
    async (
        { tour_id, user_id }: { tour_id: number; user_id: string },
        thunkAPI
    ) => {
      try {
        const response = await axios.post(`${baseURL}/favorites`, { user_id, tour_id });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

// Define other async thunks similarly for other endpoints

// Create the userToursSlice
const userToursSlice = createSlice({
  name: "userTours",
  initialState,
  reducers: {
    noUsers: () => {
      return { ...initialState };
    },
    changeConfirmingPopup: (state, action) => {
      state.isConfirmingPurchase = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(retrieveFavoriteTours.pending, (state) => {
          state.isRetrieving = true;
          state.error = "";
        })
        .addCase(retrieveFavoriteTours.fulfilled, (state, action) => {
          state.favoriteTours = action.payload;
          state.isRetrieving = false;
          state.error = "";
        })
        .addCase(retrieveFavoriteTours.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(retrieveIdFavoriteTours.pending, (state) => {
          state.isRetrieving = true;
          state.error = "";
        })
        .addCase(retrieveIdFavoriteTours.fulfilled, (state, action) => {
          state.idFavoriteTours = action.payload;
          state.isRetrieving = false;
          state.error = "";
        })
        .addCase(retrieveIdFavoriteTours.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(retrievePurchasedTours.pending, (state) => {
          state.isRetrieving = true;
          state.error = "";
        })
        .addCase(retrievePurchasedTours.fulfilled, (state, action) => {
          state.purchasedTours = action.payload;
          state.isRetrieving = false;
          state.error = "";
        })
        .addCase(retrievePurchasedTours.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(addFavoriteTour.pending, (state) => {
          state.isAdding = true;
          state.error = "";
        })
        .addCase(addFavoriteTour.fulfilled, (state) => {
          state.isAdding = false;
          state.error = "";
        })
        .addCase(addFavoriteTour.rejected, (state, action) => {
          state.isAdding = false;
          state.error = action.payload as string;
        });

    // Add other cases for other async thunks similarly
  },
});

// Export actions and reducer
export const { noUsers, changeConfirmingPopup } = userToursSlice.actions;
export default userToursSlice.reducer;
