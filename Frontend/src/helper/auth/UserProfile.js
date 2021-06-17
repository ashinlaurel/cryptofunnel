import axios from "axios";
import { API } from "../../backend";

var UserProfile = (function () {
  var id = "";
  var role = 99;
  var token = "";

  var getId = function () {
    if (id == "") return localStorage.getItem("id");
    return id; // Or pull this from cookie/localStorage
  };

  var getRole = function () {
    return role; // Or pull this from cookie/localStorage
  };

  var getToken = function () {
    return token; // Or pull this from cookie/localStorage
  };

  var setId = function (_id) {
    id = _id;
    localStorage.setItem("id", _id);
  };

  var setRole = function (r) {
    role = r;
  };
  var setToken = function (t) {
    token = t;
  };
  var isAuthenticated = async () => {
    if (getToken() == "") throw "No token set";
    console.log("is Authnticated", `Bearer ${getToken()}`);

    // if (localStorage.getItem("type") !== "0") return false;
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return axios
      .post(`${API}/signInTest`)
      .then((res) => {
        console.log("Employee authenticated", res.data);
        setRole(res.data.role);
        setId(res.data._id);

        return true;
      })
      .catch((err) => {
        console.log("auth error", err);
        localStorage.clear();
        throw err;
      });
    // return getToken();
  };

  var signout = () => {
    localStorage.clear();
    // localStorage.setItem("name","");
  };

  return {
    isAuthenticated,
    setId,
    getId,
    getRole,
    setRole,
    signout,
    getToken,
    setToken,
  };
})();

export default UserProfile;
