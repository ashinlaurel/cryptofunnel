import UserProfile from "../helper/auth/UserProfile";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
];
if (UserProfile.getRole() == 1)
  routes.push({
    path: "/app/refferals", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Refferals", // name that appear in Sidebar
  });

if (UserProfile.getRole() == 2)
  routes.push(
    {
      path: "/app/myplan", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "My Plans", // name that appear in Sidebar
    },
    {
      path: "/app/userrefferal", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "Refferal", // name that appear in Sidebar
    },
    {
      path: "/app/info", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "Profile", // name that appear in Sidebar
    }
  );

export default routes;
