import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../_DATA";

export const asyncGetAllUsers = createAsyncThunk(
  "getAllUsers",
  async (payload, thunkAPI, options) => {
    try {
      const users = await API._getUsers();

      return users;
    } catch (err) {}

    return {
      error: "Unexpected error",
    };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(asyncGetAllUsers.fulfilled, (state, action) => {
      return action.payload;
    }),
});

export const selectUsers = (appState) => appState.users;
export const selectTotalUsers = (appState) =>
  Object.keys(appState.users).length;

export const usersReducer = usersSlice.reducer;
