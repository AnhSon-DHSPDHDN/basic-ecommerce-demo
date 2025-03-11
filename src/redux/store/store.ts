import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // import others reducers in next time
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
