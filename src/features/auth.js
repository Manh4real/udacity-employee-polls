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
    const cachedUser = localStorage.getItem("user");
    const cached = cachedUser && JSON.parse(cachedUser);

    const getAndSaveUserInStorage = async (username, password) => {
      const found = await getUser(username, password);

      localStorage.setItem("user", JSON.stringify(found));
      thunkAPI.dispatch(asyncGetAllPolls());

      return found;
    };

    if (cached && payload && payload.refresh) {
      return await getAndSaveUserInStorage(cached.id, cached.password);
    }

    if (cached) {
      thunkAPI.dispatch(asyncGetAllPolls());
      return cached;
    }

    const { username, password } = payload;

    return await getAndSaveUserInStorage(username, password);
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) =>
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    }),
});

export const { setUser } = authSlice.actions;

export const selectUser = (appState) => {
  return appState.auth.user;
};

export const authReducer = authSlice.reducer;
