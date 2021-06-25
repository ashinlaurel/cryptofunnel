import { API } from "../../backend";
import UserProfile from "./UserProfile";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("NO ERROR");
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR");
      console.log("ERROR", err);
      // throw err;
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};

export const authenticate = (data, next) => {
  console.log("data", data);
  // if (typeof window !== "undefined") {
  localStorage.setItem("jwt", JSON.stringify(data));
  next();
  // }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    UserProfile.signout();

    //   return fetch(`${API}/signout`, {
    //     method: "GET",
    //   })
    //     .then((response) => console.log("signout success"))
    //     .catch((err) => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
