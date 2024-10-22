// moduls.ts


export interface ITours {
  tourId: number;
  tourName: string;
  tourDescription: string;
  tourType: string;
  tourItinerary?: string;
  startDate: string; // Ensure correct date format (ISO)
  endDate: string;   // Ensure correct date format (ISO)
  maxParticipants: number;
  tourRating: number;
  tourPrice: number;
  tourAvailability: boolean;
  image?: string;    // or appropriate type for the image if needed
}

export type Filters = "price" | "groupSize" | "duration" | "bodyType"; // Add more filter types as needed
export type ISorting = "Featured" | "PriceLowToHigh" | "PriceHighToLow" | "Rating"; // Add more sorting options as needed

export interface IFilterSorting {
  page: number;
  isLoading: boolean;
  filteredTours: ITours[];
  // Add selectedFilters to handle filter options
  selectedFilters: {
    type?: string;    // Example filter for tour type
    price?: number;   // Example filter for price
    // Add other filters as needed
  };
}


export interface IHomeBg {
  tourName: string;
  price: string;
  image: string;
  position: string;
  id: number;
}

export interface Coordinates {
  offsetX: number;
  offsetY: number;
}

export interface FilterButtons {
  price: boolean;
  groupSize: boolean;
  duration: boolean;
  bodyType: boolean;
  sort: boolean;
  [key: string]: boolean;
}

export interface IFilterBtn {
  tag: string;
  name: string;
  options: OptionsFilter[];
}

export interface OptionsFilter {
  idShared: Filters;
  idSidebar: string;
  idFull: string;
}

export interface ISortingOptions {
  idShared: string;
  idSidebar: string;
  idFull: string;
}

export interface INewUser {
  signupName: string;
  signupSurname: string;
  signupEmail: string;
  signupPassword: string;
  signupConfirm?: string;
}

export interface ILogin {
  loginEmail: string;
  loginPassword: string;
}

export interface ISingleReview {
  id: number;
  rating: number;
  review: string;
  title: string;
  date: string;
  userName: string;
  tour_id: number;
  isSuggested: boolean;
}

export interface IItinerary {
  id: number;
  tour_id: number;
  title: string;
  startDay: number;
  endDay: number;
  activities: string[];
}

export interface IDate {
  id: number;
  tour_id: number;
  startDate: string;
  price: number;
  duration: string;
}

export interface IInfoFavTour {
  name: string;
  title: string;
  price: number;
  duration: string;
  cardImage: string;
}

export interface newPurchasedTour {
  id: number;
  user_id: string;
  date_id: number;
  numTravelers: number;
  isSuitPremium: boolean;
  totalPrice: number;
  tour_id: number;
}

export interface IPurchasedTour extends newPurchasedTour {
  cardImage: string;
  created_at: string;
  title: string;
  startDate: string;
  useremail: string;
  price: number;
  userdata: {
    name: string;
    surname: string;
  };
}

// Define the IProducts interface
export interface IProducts {
  productId: number;
  productName: string;
  size: string;
  colour: string;
  price: number;
  quantityInStock: number;
  image: string;
}
