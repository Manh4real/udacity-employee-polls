import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../_DATA";
import { asyncRefreshUser } from "./auth";
import { asyncGetAllUsers } from "./users";

export const asyncGetAllPolls = createAsyncThunk(
  "getAllPolls",
  async (payload, thunkAPI, options) => {
    try {
      const polls = await API._getQuestions();

      return polls;
    } catch (err) {}

    return {
      error: "Unexpected error",
    };
  }
);

export const asyncCreateNewPoll = createAsyncThunk(
  "createNewPoll",
  async (payload, thunkAPI, options) => {
    try {
      const poll = await API._saveQuestion({
        optionOneText: payload.firstOption,
        optionTwoText: payload.secondOption,
        author: payload.user,
      });

      thunkAPI.dispatch(asyncGetAllPolls());
      thunkAPI.dispatch(asyncGetAllUsers());

      return poll;
    } catch (err) {}

    return {
      error: "Unexpected error",
    };
  }
);

export const asyncAnswer = createAsyncThunk(
  "answer",
  async (payload, thunkAPI, options) => {
    try {
      await API._saveQuestionAnswer({ ...payload });

      // Refresh data
      thunkAPI.dispatch(asyncRefreshUser());
      thunkAPI.dispatch(asyncGetAllPolls());

      return null;
    } catch (err) {}

    return {
      error: "Unexpected error",
    };
  }
);

const pollSlice = createSlice({
  name: "polls",
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(asyncGetAllPolls.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(asyncCreateNewPoll.fulfilled, (state, action) => {})
      .addCase(asyncAnswer.fulfilled, (state, action) => {}),
});

export const selectPolls = (appState) => appState.polls;
export const selectPoll = (id) => (appState) => appState.polls[id];

export const pollReducer = pollSlice.reducer;
