import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
//initalsState
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create color action
export const createColorAction = createAsyncThunk(
  "colors/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const { name } = payload;

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

      const { data } = await axios.post(`${baseURL}colors`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update color action
export const updateColorAction = createAsyncThunk(
  "color/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const { name, id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}colors/${id}`,
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

//fetch colors action
export const fetchColorsAction = createAsyncThunk(
  "color/fetch all",
  async ({ payload }, { rejectWithValue, getState, dispatch }) => {
    // console.log(url);
    try {
      const { data } = await axios.get(`${baseURL}colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch single color action
export const fetchColorAction = createAsyncThunk(
  "color/details",
  async (colorId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}colors/${colorId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create color
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //update color
    builder.addCase(updateColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    //fetch all colors
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch single color
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
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
const colorReducer = colorSlice.reducer;

export default colorReducer;
