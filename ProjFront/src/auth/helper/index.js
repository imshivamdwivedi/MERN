import { API } from "../../backend";
//API means http://localhost:8000/api

//we here exporting signup method and we are passing user as parameter
// we will get user parameter from frontend as javascript object anwe usejson.stringify to convert it in json format.
export const signup = user => {
  //fetch part is for request and other two part will handle respnse coming from backend
  //.then part is if request fulfilled success fully
  //.catch part will show us the errors occur during request. 
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

//we make sure that user will remain continously sign in after hitting sign in for decided time
// we will create authenticate method
export const authenticate = (data, next) => {
  // in if statement we are accessing window object.if it is not undefine we are putting jwt to users browser.
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {    //signout  isa middle ware here
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
   //after removing token. user must log out from  backend also so we will send request using fetch to sign out user.
    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

//isAuthenticated method is just to validate that user is signed in or out
export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  // we are not retuning dirctly true  if user have  jwt in browser.
  //insted we are returning value of token  and in frontend( means in our component)-
  //-we will verify that token is exacly same as user's we are looking for then only we gonna fire this up as true.
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

