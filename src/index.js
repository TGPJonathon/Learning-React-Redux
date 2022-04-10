import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import StreamList from "./components/streams/StreamList";
import StreamCreate from "./components/streams/StreamCreate";
import StreamEdit from "./components/streams/StreamEdit";
import StreamDelete from "./components/streams/StreamDelete";
import StreamShow from "./components/streams/StreamShow";
import Header from "./components/Header";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<StreamList />} />
          <Route path="/streams/new" exact element={<StreamCreate />} />
          <Route path="/streams/edit/:id" exact element={<StreamEdit />} />
          <Route path="/streams/delete/:id" exact element={<StreamDelete />} />
          <Route path="/streams/:id" exact element={<StreamShow />} />
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
  // </React.StrictMode>
);
