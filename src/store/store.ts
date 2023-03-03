import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userAPI } from "./../service/UserService"

export const setupStore = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userAPI.middleware),
})

export type RootState = ReturnType<typeof setupStore.getState>
export type AppDispatch = typeof setupStore.dispatch
