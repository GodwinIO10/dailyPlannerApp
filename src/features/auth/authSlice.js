import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit" 
import authService from "./authService"



// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))



// Register user. This is the actual start of the api call and continues at the authService register function
export const register = createAsyncThunk("auth/register", async(user, thunkAPI) => {// user passed in from register page/ component
    try {
        return await authService.register(user)// payload from register function (register.fulfilled) is returned 
    
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



// Login user
export const login = createAsyncThunk("auth/login", async(user, thunkAPI) => {// user passed into user from login page/ component
    try {
        return await authService.login(user)// payload from login function (login.fulfilled) is returned 
    
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



// Log out user
export const logout = createAsyncThunk("auth/logout", () => { 
    authService.logout()
})



const initialState = {
    user: user ? user: "", // if there's user in local storage, use it, else user value is empty string (not null)
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {     // functions within reducers are not asynch ie they're not thunk functions
        reset: (state) => {  // reset function resets state to default values
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        } 
    },
    extraReducers: (builder) => { // functions within extraReducers are async ie they are thunk functions
        builder
            .addCase(register.pending, (state) => { // register is name of function
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => { // data is sent back from db
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => { 
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = ""
            })

    }
})



export const { reset } = authSlice.actions
export default authSlice.reducer