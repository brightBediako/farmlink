import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";


const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
//initalsState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};


//create brand action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name
      } = payload;
      
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //FormData
      const formData = new FormData();
      formData.append("name", name);

      const { data } = await axios.post(
        `${baseURL}categories`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update brand action
export const updateBrandAction = createAsyncThunk(
  "category/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        id,
      } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}brands/update-brand/${id}`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch brands action
export const fetchBrandsAction = createAsyncThunk(
  "brand/fetch all",
  async ({ payload }, { rejectWithValue, getState, dispatch }) => {
    // console.log(url);
    try {
      const { data } = await axios.get(`${baseURL}brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch single category action
export const fetchBrandAction = createAsyncThunk(
  "brand/details",
  async (categoryId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${baseURL}brands/${brandId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {

    //create brand
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //update Brand
    builder.addCase(updateBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    //fetch all Brands
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch single Brand
    builder.addCase(fetchBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });

    //reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate the reducer
const brandReducer = brandSlice.reducer;

export default brandReducer;

