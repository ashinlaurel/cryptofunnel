import { lazy } from "react";
import UserProfile from "../helper/auth/UserProfile";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/User/Dashboard"));
const UserInfo = lazy(() => import("../pages/User/UserInfo"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
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
const routes = [
  {
    path: "/dashboard", // the url
    component: UserProfile.getRole() == 1 ? AdminDashboard : Dashboard, // view rendered
  },
];

if (UserProfile.getRole() == 0 || UserProfile.getRole() == 2)
  routes.push(
    {
      path: "/myplan", // the url
      component: MyPlan, // view rendered
    },
    {
      path: "/info", // the url
      component: UserInfo, // view rendered
    }
  );

export default routes;
