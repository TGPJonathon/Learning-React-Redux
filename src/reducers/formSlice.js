import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {
    updateFormState(state, action) {
      state[action.payload.form] = action.payload.state;
    },
  },
  extraReducers: {
    // [createStream.fulfilled]: (state, action) => {
    //   console.log("Successfully Posted");
    // },
  },
});

export const { updateFormState } = formSlice.actions;

export const formReducer = formSlice.reducer;
