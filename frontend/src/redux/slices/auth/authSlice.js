import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

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
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    },
};

// login action
export const loginUserAction = createAsyncThunk(
    "users/login",
    async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
        try {
            // http call
            const { data } = await axios.post(`${baseURL}auth/login`, {
                email,
                password,
            });
            // save user into local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;

        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (
        { fullname, email, phone, password },
        { rejectWithValue, getState, dispatch }
    ) => {
        try {
            //make the http request
            const { data } = await axios.post(`${baseURL}auth/register`, {
                fullname,
                email,
                phone,
                password,
            });
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

//logout action
export const logoutAction = createAsyncThunk(
    "users/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //get token
        localStorage.removeItem("userInfo");
        return true;
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

        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });

        //logout
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = null;
        });

        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
        });
    },
});

// generate reducer
const authReducer = authSlice.reducer;
export default authReducer;
