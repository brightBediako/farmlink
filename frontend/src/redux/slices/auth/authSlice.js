import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// initial state
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: null,
    },
};

// login action
export const loginUserAction = createAsyncThunk(
    "users/login",
    async({email,password}, { rejectWithValue, getState, dispatch }) => { 
        try {
            // http call
            const {data} = await axios.post(`${baseURL}auth/login`, {
                email,
                password,
            });
            return data;

        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

// users slice
const authSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
            state.userAuth.error = null;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
        });
    },
});

// generate reducer
const authReducer = authSlice.reducer;
export default authReducer;
