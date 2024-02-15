import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogin, INewUser } from "../../moduls";
import { changeConfirmingPopup, noUsers, retrieveFavoriteTours, retrieveIdFavoriteTours, retrievePurchasedTours } from "../UserTours/userToursSlice";
import axios from 'axios';

type IAuth = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isGettingCurrentUser: boolean;
  id: string;
  errorLogin: string;
  errorSignup: string;
  name: string;
  surname: string;
  isRegistering: boolean;
  token: string;

};

const initialState: IAuth = {
  isLoggedIn: false,
  isLoading: false,
  isGettingCurrentUser: false,
  id: "",
  errorLogin: "",
  errorSignup: "",
  name: "",
  surname: "",
  isRegistering: false,
  token: "",
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ loginEmail, loginPassword }: ILogin, thunkAPI) => {
      try {
        const response = await axios.post('/authenticate', {
          email: loginEmail,
          password: loginPassword,
        });
        localStorage.setItem('token', response.data.accessToken);
        console.log("Token Set in AuthSlice:::",localStorage.getItem("accessToken"));


        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
);


export const createUser = createAsyncThunk(
    "auth/createUser",
    async (
        {
          signupName: name,
          signupSurname: surname,
          signupEmail: email,
          signupPassword: password,
        }: INewUser,
        thunkAPI
    ) => {
      try {
        const response = await axios.post('/register', {
          name,
          surname,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return null;
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.dispatch(retrieveIdFavoriteTours(data.user.id))
      thunkAPI.dispatch(retrieveFavoriteTours(data.user.id))
      thunkAPI.dispatch(retrievePurchasedTours(data.user.id))
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
      thunkAPI.dispatch(noUsers())
      thunkAPI.dispatch(changeConfirmingPopup(false))
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetErrors: (state) => {
      (state.errorLogin = ""), (state.errorSignup = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorLogin = "";
        state.isLoggedIn = false;
      })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.token = action.payload.token;
          setTokenInLocalStorage(action.payload.token);
          state.errorLogin = "";
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.isRegistering = false;
          state.isLoggedIn = true;
          state.token = action.payload.token;
          setTokenInLocalStorage(action.payload.token);
          state.errorSignup = "";
        })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogin = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isGettingCurrentUser = true;
        state.errorLogin = "";
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isGettingCurrentUser = false;
        state.isLoggedIn = action.payload?.user.role === "authenticated";
        state.id = action.payload?.user.id as string;
        state.errorLogin = "";
        state.name = action.payload?.user.user_metadata.name;
        state.surname = action.payload?.user.user_metadata.surname;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isGettingCurrentUser = false;
        state.errorLogin = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(createUser.pending, (state) => {
        state.isRegistering = true;
        state.errorSignup = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isRegistering = false;
        state.errorSignup = action.payload as string;
      })
  },
});

export const { resetErrors } = authSlice.actions;
export default authSlice.reducer;
