import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  loggedInUserToken: null, // this should only contain user identity => 'id', 'role'
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async ({ email, password, addresses, role, alert }) => {
    const response = await createUser({ email, password, addresses, role });
    alert.success("Signed up successfully");
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, alert }) => {
    const response = await loginUser({ email, password });
    alert.success("Logged In successfully");
    return response.data;
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  const response = await checkAuth();
  return response.data;
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email) => {
    const response = await resetPasswordRequest(email);
    return response.data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    const response = await resetPassword(data);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async ({ alert }) => {
    const response = await signOut();
    alert.success("Logged Out successfully");
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setDefaultErrorMessage: (state) => {
        state.error = {message: "Please signup or login to continue"}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
        state.error = action.error;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.error = null;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
        state.loggedInUserToken = null;
        state.userChecked = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
        state.error = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
        state.error = null;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const { setDefaultErrorMessage } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectLoggedInStatus = (state) => state.auth.status;

export default authSlice.reducer;
