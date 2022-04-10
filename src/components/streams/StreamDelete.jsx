import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../reducers/streamsSlice";

const StreamDelete = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [stream, setStream] = useState(null);

  const actions = (
    <div>
      <button
        onClick={() => {
          dispatch(deleteStream(params.id)).then((res) => {
            if (res.payload.status === 200) navigate("/");
          });
        }}
        className="ui button negative"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </div>
  );

  useEffect(() => {
    if (stream === null)
      dispatch(fetchStream(params.id)).then((res) => {
        setStream(res.payload);
      });
  }, [dispatch, params.id, stream]);

  return (
    <Modal
      title="Delete Stream"
      content={
        stream !== null
          ? `Delete Stream: ${stream.title}?`
          : "Are you sure you want to delete this?"
      }
      actions={actions}
      onDismiss={() => navigate("/")}
    />
  );
};

export default StreamDelete;
