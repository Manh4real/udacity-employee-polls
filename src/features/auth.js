import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as API from "../_DATA";
import { asyncGetAllPolls } from "./poll";

const getUser = async (username, password) => {
  try {
    const users = await API._getUsers();
    const found = users[username];

    if (!found)
      return {
        error: "Failed to login",
      };

    if (found.password !== password) {
      return {
        error: "Incorrect password",
      };
    }

    return found;
  } catch (err) {}

  return {
    error: "Unexpected error",
  };
};

export const loginThunk = createAsyncThunk(
  "login",
  async (payload, thunkAPI, options) => {
    const getUserAndRefreshPolls = async (username, password) => {
      const found = await getUser(username, password);

      thunkAPI.dispatch(asyncGetAllPolls());

      return found;
    };

    if (payload && payload.refresh) {
      return await getUserAndRefreshPolls();
    }

    const { username, password } = payload;

    return await getUserAndRefreshPolls(username, password);
  }
);

export const logoutThunk = createAsyncThunk(
  "logout",
  (payload, thunkAPI, options) => {
    thunkAPI.dispatch(setUser(null));

    return {
      status: "SUCCESS",
    };
  }
);

export const asyncRefreshUser = createAsyncThunk(
  "refreshUser",
  async (payload, thunkAPI, options) => {
    try {
      const currentUser = thunkAPI.getState().auth.user;

      console.log(thunkAPI.getState());

      if (!currentUser)
        return {
          error: "Please login",
        };

      const users = await API._getUsers();
      const found = users[currentUser.id];

      if (!found)
        return {
          error: "Failed to refresh user",
        };

      return { ...found };
    } catch (err) {}

    return {
      error: "Unexpected error",
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(asyncRefreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

export const { setUser } = authSlice.actions;

export const selectUser = (appState) => {
  return appState.auth.user;
};

export const authReducer = authSlice.reducer;
