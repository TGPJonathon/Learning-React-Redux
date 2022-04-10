import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStream } from "../../reducers/streamsSlice";

const StreamShow = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const stream = useSelector((state) => state.stream[params.id]);

  useEffect(() => {
    try {
      dispatch(fetchStream(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  return (
    <div>
      <h1>{stream === undefined ? "Loading:" : stream.title}</h1>
      <h5>{stream === undefined ? "Loading:" : stream.description}</h5>
    </div>
  );
};

export default StreamShow;
