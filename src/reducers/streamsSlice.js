import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import streams from "../apis/streams";

export const createStream = createAsyncThunk(
  "stream/createStream",
  async (formValues, { getState }) => {
    const { userId } = getState().login;
    const response = await streams.post("/streams", { ...formValues, userId });
    return response;
  }
);

export const fetchStreams = createAsyncThunk(
  "stream/fetchStreams",
  async (_, thunkAPI) => {
    const response = await streams.get("/streams");
    return response.data;
  }
);

export const fetchStream = createAsyncThunk(
  "stream/fetchStream",
  async (id, thunkAPI) => {
    const response = await streams.get(`/streams/${id}`);
    return response.data;
  }
);

export const editStream = createAsyncThunk(
  "stream/editStream",
  async (object, thunkAPI) => {
    const response = await streams.patch(
      `/streams/${object.id}`,
      object.formValues
    );
    return response;
  }
);

export const deleteStream = createAsyncThunk(
  "stream/deleteStream",
  async (id, thunkAPI) => {
    const response = await streams.delete(`/streams/${id}`);
    return response;
  }
);

const streamSlice = createSlice({
  name: "stream",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createStream.fulfilled]: (state, action) => {
      state = { ...state, [action.payload.id]: action.payload };
    },
    [fetchStream.fulfilled]: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    [fetchStreams.fulfilled]: (state, action) => {
      const streamObject = {};
      for (let stream of action.payload) {
        streamObject[stream.id] = stream;
      }

      return streamObject;
    },
    [editStream.fulfilled]: (state, action) => {
      state = { ...state, [action.payload.id]: action.payload };
    },
    [deleteStream.fulfilled]: (state, action) => {
      const { [action.payload.id]: u, ...others } = state;
      state = others;
    },
  },
});

export const streamReducer = streamSlice.reducer;
