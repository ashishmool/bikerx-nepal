import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITours } from "../../moduls";

type ICurrentTour = {
    currentTour: ITours;
    error: string;
    isRetrieving: boolean;
};

const initialState: ICurrentTour = {
    currentTour: {} as ITours,
    error: "",
    isRetrieving: false,
};

const baseURL = "http://localhost:8080"; // Define your backend base URL

export const retrieveOneTour = createAsyncThunk(
    "currentTour/retrieveOneTour",
    async (id: string, thunkAPI) => {
        try {
            // Fetch tour data by ID
            const response = await axios.get(`${baseURL}/tour/getById/${id}`);
            return response.data;
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
            });
    },
});

export const { resetCurrentTour } = currentTourSlice.actions;
export default currentTourSlice.reducer;
