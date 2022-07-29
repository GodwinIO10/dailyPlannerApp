import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import planService from "./planService"



// Create new plan
export const createPlan = createAsyncThunk("plan/create", async (planData, thunkAPI) => { //data is passed into planData when plan is created at frontend
    try {
        const token = thunkAPI.getState().auth.user.token
        return await planService.createPlan(planData, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get user plans
export const getPlans = createAsyncThunk("plans/getAll", async (_, thunkAPI) => {// nothing is passed into the "_"
    try {
        const token = thunkAPI.getState().auth.user.token
        return await planService.getPlans(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user plan
export const deletePlan = createAsyncThunk("plans/delete", async (planId, thunkAPI) => { 
    try {
        const token = thunkAPI.getState().auth.user.token
        return await planService.deletePlan(planId, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const initialState = {
    plans: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


export const planSlice = createSlice({
    name: "plan",
    initialState,
    reducers: {
        reset: (state) => initialState // reset to values of initialState. Done differently in authSlice because user should persist while plan may be empty array.
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPlan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPlan.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.plans.push(action.payload) // newly created plan
            })
            .addCase(createPlan.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = (action.payload)
            })
            .addCase(getPlans.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.plans = (action.payload) // all plans from specific user retrieved
            })
            .addCase(getPlans.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = (action.payload)
            })
            .addCase(deletePlan.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.plans = state.plans.filter(
                    (plan) => plan._id !== action.payload.id // Except the deleted/selected plan, all other plans from specific user are retrieved
                ) 
            })
            .addCase(deletePlan.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = (action.payload)
            })
    }
})



export const { reset } = planSlice.actions
export default planSlice.reducer