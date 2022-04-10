import React, { useEffect } from "react";
import { fetchStreams } from "../../reducers/streamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StreamList = () => {
  const dispatch = useDispatch();
  const listOfStreams = useSelector((state) => Object.values(state.stream));
  const { loggedIn, userId } = useSelector((state) => state.login);

  const showStreamButtons = (stream) => {
    if (userId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return listOfStreams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {showStreamButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link className="header" to={`streams/${stream.id}`}>
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const createStreamButton = () => {
    if (loggedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {createStreamButton()}
    </div>
  );
};

export default StreamList;
