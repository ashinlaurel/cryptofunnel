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
import SaaSProductLandingPage from "./demos/SaaSProductLandingPage";
import Payment from "./pages/Payment/Payment";
// STRIPE
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserRoute from "./helper/auth/UserRoutes";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={SaaSProductLandingPage} />
            <Route path="/payment" component={Payment} />

            {/* Place new routes over this */}
            <Route path="/signin" component={AdminLogin} />
            <Route path="/signup" component={AdminSignup} />

            <AdminRoute path="/app" component={Layout} />
            {/* <UserRoute path="/app/" component={Layout} /> */}
            {/* If you have an index page, you can remothis Redirect */}
          </Switch>
        </Router>
      </Elements>
    </>
  );
}

export default App;
