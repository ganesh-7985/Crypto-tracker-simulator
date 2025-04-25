import { configureStore } from "@reduxjs/toolkit"
import assetsReducer from "./features/assets/assetsSlice"

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
  },
})
