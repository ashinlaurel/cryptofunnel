import { lazy } from "react";
import UserProfile from "../helper/auth/UserProfile";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/User/Dashboard"));
const UserInfo = lazy(() => import("../pages/User/UserInfo"));
const ConfirmPayment = lazy(() => import("../pages/Payment/ConfirmPayment"));
const FailedPayment = lazy(() => import("../pages/Payment/FailedPayment"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const Refferals = lazy(() => import("../pages/Refferals/Refferals"));
const RefferalRequests = lazy(() =>
  import("../pages/Refferals/RefferalRequests")
);
const UserRefferals = lazy(() => import("../pages/Refferals/UserRefferals"));
const Influencers = lazy(() => import("../pages/Influencers/Influencers"));
const InfluencerPage = lazy(() =>
  import("../pages/Influencers/InfluencerPage")
);
const UserPaymentHistory = lazy(() =>
  import("../pages/Payment/UserPaymentHistory")
);
const MyPlan = lazy(() => import("../pages/MyPlan"));
const Forms = lazy(() => import("../pages/Forms"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
let routes = [];

if (UserProfile.getRole() == 0) {
  routes.push({
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  });
}

// admin routes
if (UserProfile.getRole() == 1) {
  routes.push(
    {
      path: "/dashboard", // the url
      component: AdminDashboard, // view rendered
    },
    {
      path: "/refferals", // the url
      component: Refferals, // view rendered
    },
    {
      path: "/influencers", // the url
      component: Influencers, // view rendered
    },
    {
      path: "/influencerpage/:id", // the url
      component: InfluencerPage, // view rendered
    },
    {
      path: "/RefferalRequests", // the url
      component: RefferalRequests, // view rendered
    },
    {
      path: "/paymenthistory", // the url
      component: UserPaymentHistory, // view rendered
    }
  );
}

// 2 - non purchased used , 3- purchased user

if (
  UserProfile.getRole() == 2 ||
  UserProfile.getRole() == 3 ||
  UserProfile.getRole() == 4
)
  routes.push(
    {
      path: "/dashboard", // the url
      component: Dashboard, // view rendered
    },
    {
      path: "/myplan", // the url
      component: MyPlan, // view rendered
    },
    {
      path: "/info", // the url
      component: UserInfo, // view rendered
    },
    {
      path: "/paymenthistory", // the url
      component: UserPaymentHistory, // view rendered
    },
    {
      path: "/userrefferal", // the url
      component: UserRefferals, // view rendered
    },
    {
      path: "/ConfirmPayment/:status/:sessionId/:refCode/:refStatus", // the url
      component: ConfirmPayment, // view rendered
    },
    {
      path: "/ConfirmPayment/paymentfailed", // the url
      component: FailedPayment, // view rendered
    }
  );

export default routes;
