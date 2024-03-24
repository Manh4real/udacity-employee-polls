import { configureStore } from "@reduxjs/toolkit";
import { pollReducer } from "./poll";
import { authReducer } from "./auth";
import { usersReducer } from "./users";

export const store = configureStore({
  reducer: {
    polls: pollReducer,
    users: usersReducer,
    auth: authReducer,
  },
});
