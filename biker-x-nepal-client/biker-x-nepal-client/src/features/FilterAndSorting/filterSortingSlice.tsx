import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterButtons, Filters, ISorting, ITours } from "../../moduls";
import { filterAndSort } from "../../services/useFilters";

// Define the type for the state
type IFilterSorting = {
  searchText: string;
  isFixed: boolean;
  page: number;
  areTheyOpen: FilterButtons;
  addedFilters: Filters[];
  currentSorting: ISorting;
  allTours: ITours[];
  filteredTours: ITours[];
  isLoading: boolean;
  error: any;
};

// Define the initial state
const initialState: IFilterSorting = {
  searchText: "",
  isFixed: false,
  page: 1,
  areTheyOpen: {
    price: false,
    groupSize: false,
    duration: false,
    bodyType: false,
    sort: false,
  },
  addedFilters: [],
  filteredTours: [],
  currentSorting: "Featured",
  allTours: [],
  isLoading: false,
  error: null,
};

// Define async thunk for fetching all tours
export const getAllTours = createAsyncThunk(
    "tours/getMyTours",
    async (_, thunkAPI) => {
      try {
        // Fetch data from the backend or any external API
        // For now, let's assume it's fetched successfully
        const data = await fetchData(); // Implement fetchData function
        return data;
      } catch (error) {
        // Handle errors
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

// Define the filter and sorting slice
const filterSortingSlice = createSlice({
  name: "filterSorting",
  initialState,
  reducers: {
    changeText: (state, { payload }) => {
      state.searchText = payload;
      state.addedFilters = [];
      state.page = initialState.page;
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      ).filter((tour: ITours) =>
          tour.title?.toLocaleLowerCase().includes(payload.toLowerCase())
      );
    },
    cleanSearchBar: (state) => {
      state.searchText = "";
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      );
      state.page = initialState.page;
    },
    toggleFixing: (state, { payload }) => {
      state.isFixed = payload;
    },
    resetPages: (state) => {
      state.page = initialState.page;
      state.isFixed = initialState.isFixed;
      state.searchText = initialState.searchText;
    },
    changePage: (state, { payload }: { payload: "next" | "previous" }) => {
      if (payload === "next") {
        state.page += 1;
      } else {
        state.page -= 1;
      }
    },
    closeThemAll: (state) => {
      state.areTheyOpen = initialState.areTheyOpen;
    },
    openOneOfThem: (state, { payload }) => {
      state.areTheyOpen = {
        ...initialState.areTheyOpen,
        [payload]: !state.areTheyOpen[payload],
      };
    },
    clearAllFilters: (state) => {
      state.addedFilters = [];
      state.page = initialState.page;
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      );
    },
    addOrDeleteFilter: (state, { payload }: { payload: Filters }) => {
      if (state.addedFilters.includes(payload)) {
        state.addedFilters = state.addedFilters.filter(
            (filter) => filter !== payload
        );
      } else {
        state.addedFilters.push(payload);
      }
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      );
      state.searchText = "";
    },
    changeCurrentSorting: (state, { payload }: { payload: ISorting }) => {
      state.currentSorting = payload;
      state.searchText = initialState.searchText;
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      );
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getAllTours.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllTours.fulfilled, (state, action) => {
          state.isLoading = false;
          state.allTours = action.payload;
          state.filteredTours = filterAndSort(
              state.addedFilters,
              state.currentSorting,
              action.payload
          );
        })
        .addCase(getAllTours.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
  },
});

// Export actions and reducer
export const {
  changeText,
  cleanSearchBar,
  toggleFixing,
  resetPages,
  changePage,
  closeThemAll,
  openOneOfThem,
  clearAllFilters,
  addOrDeleteFilter,
  changeCurrentSorting,
} = filterSortingSlice.actions;
export default filterSortingSlice.reducer;

// Define a placeholder function for fetching data from the backend
async function fetchData() {
  return Promise.resolve([]); // Placeholder implementation
}
