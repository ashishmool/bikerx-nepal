import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITours, ISingleReview, IItinerary, IDate } from "../../moduls"; // Update path as necessary

interface ICurrentTour {
  currentTour: ITours;
  error: string;
  isRetrieving: boolean;
  reviewsTour: ISingleReview[];
  itinerary: IItinerary[];
  dates: IDate[];
}

const initialState: ICurrentTour = {
  currentTour: {} as ITours,
  error: "",
  isRetrieving: false,
  reviewsTour: [],
  itinerary: [],
  dates: [],
};

const baseURL = "http://13.48.249.115:8080"; // Adjust the base URL as needed

const axiosInstance = axios.create({
  baseURL,
});

export const retrieveOneTour = createAsyncThunk(
    "currentTour/retrieveOneTour",
    async (id: string, thunkAPI) => {
      try {
        const { data: tour } = await axiosInstance.get(`/tour/getById/${id}`);
        thunkAPI.dispatch(retrieveReviews(id));
        thunkAPI.dispatch(retrieveItinerary(id));
        thunkAPI.dispatch(retrieveDates(id));
        return tour;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const retrieveReviews = createAsyncThunk(
    "currentTour/retrieveReviews",
    async (id: string, thunkAPI) => {
      try {
        const { data: reviews } = await axiosInstance.get(`/reviews/${id}`);
        return reviews;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const retrieveItinerary = createAsyncThunk(
    "currentTour/retrieveItinerary",
    async (id: string, thunkAPI) => {
      try {
        const { data: itinerary } = await axiosInstance.get(`/itinerary/${id}`);
        return itinerary;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const retrieveDates = createAsyncThunk(
    "currentTour/retrieveDates",
    async (id: string, thunkAPI) => {
      try {
        const { data: dates } = await axiosInstance.get(`/dates/${id}`);
        return dates;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

const currentTourSlice = createSlice({
  name: "currentTour",
  initialState,
  reducers: {
    resetCurrentTour: (state) => {
      state.currentTour = {} as ITours;
      state.reviewsTour = [];
      state.itinerary = [];
      state.dates = [];
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(retrieveOneTour.pending, (state) => {
          state.isRetrieving = true;
          state.error = "";
        })
        .addCase(retrieveOneTour.fulfilled, (state, action) => {
          state.isRetrieving = false;
          state.currentTour = action.payload;
        })
        .addCase(retrieveOneTour.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(retrieveReviews.fulfilled, (state, action) => {
          state.isRetrieving = false;
          state.reviewsTour = action.payload;
        })
        .addCase(retrieveReviews.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(retrieveItinerary.fulfilled, (state, action) => {
          state.isRetrieving = false;
          state.itinerary = action.payload;
        })
        .addCase(retrieveItinerary.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        })
        .addCase(retrieveDates.fulfilled, (state, action) => {
          state.isRetrieving = false;
          state.dates = action.payload.sort((a, b) => {
            const date1 = new Date(a.startDate);
            const date2 = new Date(b.startDate);
            return date1.getTime() - date2.getTime();
          });
        })
        .addCase(retrieveDates.rejected, (state, action) => {
          state.isRetrieving = false;
          state.error = action.payload as string;
        });
  },
});

export const { resetCurrentTour } = currentTourSlice.actions;

export default currentTourSlice.reducer;
