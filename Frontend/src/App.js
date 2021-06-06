import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import AdminLogin from "../src/pages/Admin/AdminLogin";
import AdminSignup from "../src/pages/Admin/AdminSignup";
import Home from "../src/LandingPage/Home";
import AdminRoute from "./helper/auth/AdminRoutes";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />

          {/* Place new routes over this */}
          <Route path="/admin/signin" component={AdminLogin} />
          <Route path="/admin/signup" component={AdminSignup} />

          <AdminRoute path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
