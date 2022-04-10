import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { loginReducer } from "../reducers/loginSlice";
import { formReducer } from "../reducers/formSlice";
import { streamReducer } from "../reducers/streamsSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    form: formReducer,
    stream: streamReducer,
  },
  devTools: true,
  middleware: [thunk],
});

export default store;
