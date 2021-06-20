import axios from "axios";
import { API } from "../../backend";

var UserProfile = (function () {
  var id = "";
  var role = 99;
  var token = -1;
  var name = "";

  var getId = function () {
    if (id == "") return localStorage.getItem("id");
    return id; // Or pull this from cookie/localStorage
  };
  var getName = function () {
    if (name == "") return JSON.parse(localStorage.getItem("jwt")).user.name;
    return name; // Or pull this from cookie/localStorage
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
    // console.log("HERE", localStorage.getItem("jwt"));
    let token;
    if (getToken() == -1) {
      if (localStorage.getItem("jwt") == null) throw "No token found";
      token = JSON.parse(localStorage.getItem("jwt")).token;
      setToken(token);
    }
    // if (getToken() == "") throw "No token set";
    // console.log("is Authnticated", `Bearer ${getToken()}`);

    // if (localStorage.getItem("type") !== "0") return false;
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return axios
      .post(`${API}/signInTest`)
      .then((res) => {
        // console.log("Employee authenticated", res.data);
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
    getName,
    signout,
  };
})();

export default UserProfile;
