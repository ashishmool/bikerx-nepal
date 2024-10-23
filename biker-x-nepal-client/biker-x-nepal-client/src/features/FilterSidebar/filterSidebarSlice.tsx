import { createSlice } from "@reduxjs/toolkit";
import { FilterButtons } from "../../moduls";

// Define the initial state for the sidebar filter
type INavbar = {
  isOpen: boolean;
  areTheyOpenSidebar: FilterButtons;
};

const initialState: INavbar = {
  isOpen: false,
  areTheyOpenSidebar: {
    price: false,
    groupSize: false,
    duration: false,
    tourType: false,
    sort: false,
  },
};

// Create the Redux slice for filter sidebar state management
const filterSidebar = createSlice({
  name: "filterSidebar",
  initialState,
  reducers: {
    toggleFilterSidebar: (state, { payload }) => {
      state.isOpen = payload;
    },
    openOrClose: (state, { payload }) => {
      state.areTheyOpenSidebar[payload] = !state.areTheyOpenSidebar[payload];
    },
    closeThemAllSidebar: (state) => {
      state.areTheyOpenSidebar = initialState.areTheyOpenSidebar;
    },
  },
});

// Export actions and reducer
export const { toggleFilterSidebar, openOrClose, closeThemAllSidebar } = filterSidebar.actions;
export default filterSidebar.reducer;
