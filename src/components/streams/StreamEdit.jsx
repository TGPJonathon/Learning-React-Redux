import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchStream, editStream } from "../../reducers/streamsSlice";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const [streamInfo, setStreamInfo] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (streamInfo === null) {
      try {
        dispatch(fetchStream(params.id)).then((res) => {
          setStreamInfo(res.payload);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, params.id, streamInfo]);

  const onSubmit = (formValues) => {
    const formObject = { formValues: formValues, id: params.id };
    dispatch(editStream(formObject)).then((values) => {
      if (values.payload.status === 200) navigate("/");
    });
  };

  return (
    <div>
      {streamInfo !== null ? (
        <div>
          <h3>Edit A Strean</h3>
          <StreamForm initialValues={streamInfo} onSubmit={onSubmit} />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default StreamEdit;
