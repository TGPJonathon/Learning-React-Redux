import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../reducers/loginSlice";

const GoogleAuth = () => {
  const [auth, setAuth] = useState(null);
  const { loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth === null) {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            clientId: "replace with your own id",
            scope: "email",
          })
          .then(() => {
            setAuth(window.gapi.auth2.getAuthInstance());
          });
      });
    }
    if (auth) {
      if (loggedIn === null) {
        auth.isSignedIn.get()
          ? dispatch(signIn(auth.currentUser.get().getId()))
          : dispatch(signOut());
      }

      let listenerContext = auth.isSignedIn.listen((bool) => {
        bool
          ? dispatch(signIn(auth.currentUser.get().getId()))
          : dispatch(signOut());
      });

      return () => {
        listenerContext?.remove();
      };
    }
  }, [dispatch, auth, loggedIn]);

  const renderAuthButton = () => {
    if (loggedIn === null) return null;
    else if (loggedIn)
      return (
        <button onClick={() => auth.signOut()} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    else
      return (
        <button onClick={() => auth.signIn()} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
