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
            const {data} = await axios.post(`${baseURL}users/login`, {
                email,
                password,
            });
            return data;

        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);
