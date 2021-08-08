import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import UserProfile from "./UserProfile";

const AdminRoute = ({ component: Component, ...rest }) => {
  // console.log("her", Emp.isAuthenticated());
  const [isAuth, setIsAuth] = useState("");
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      let isA = await UserProfile.isAuthenticated();
      // console.log("ISAUTH", isA);
      setIsAuth(true);
      console.log("attepting user signin -> success");
      setLoading(false);
    } catch (err) {
      console.log("Auth check fail");
      setIsAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <Route
          {...rest}
          render={(props) =>
            isAuth ? <Component {...props} /> : <Redirect to="/#signup" />
          }
        />
      )}
    </>
  );
};

export default AdminRoute;
