import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import planReducer from "../features/plans/planSlice"

export const store = configureStore({
    reducer: {  // reducer contains names of the different slices created and their reducers/actions
        auth: authReducer,
        plans: planReducer,
    },
})