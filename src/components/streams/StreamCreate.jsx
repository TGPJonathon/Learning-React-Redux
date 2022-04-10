import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createStream } from "../../reducers/streamsSlice";
import StreamForm from "./StreamForm";

const StreamCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formValues) => {
    dispatch(createStream(formValues)).then((values) => {
      if (values.payload.status === 201) navigate("/");
    });
  };

  return (
    <div>
      <h3>Create A Stream </h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default StreamCreate;
