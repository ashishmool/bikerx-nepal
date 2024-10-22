import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterButtons, Filters, ISorting, ITours } from "../../moduls";
import { filterAndSort } from "../../services/useFilters";
import axios from "axios";

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
  selectedFilters: {
    type?: string; // Add relevant filter types as needed
    price?: number; // For example, to filter by price
  };
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
  selectedFilters: {
    type: undefined,
    price: undefined,
  },
};

// Define async thunk for fetching all tours
export const getAllTours = createAsyncThunk<ITours[], void>(
    "tours/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:8080/tour/getAll");
        return response.data;
      } catch (error: any) {
        console.error("Error fetching tours:", error);
        return rejectWithValue(error.response.data || "Failed to fetch tours");
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

      // Filter the tours based on searchText (title) and added filters
      state.filteredTours = filterAndSort(
          state.addedFilters,
          state.currentSorting,
          state.allTours
      ).filter((tour: ITours) =>
          tour.tourName.toLowerCase().includes(payload.toLowerCase()) // Search by tour name
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

      // Reset selected filters if needed
      state.selectedFilters = {
        type: undefined,
        price: undefined,
      };
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
    setSelectedFilters: (state, { payload }) => {
      state.selectedFilters = payload; // Update selectedFilters
      // Reapply filtering when selectedFilters change
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
          state.error = action.payload; // Set error from payload
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
  setSelectedFilters,
} = filterSortingSlice.actions;
export default filterSortingSlice.reducer;
