import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

//use stae is like we are intializing values and setValues.those args we are passing in useState
// are assign to  react variable(here variable is values). ans setValues isused to ypdate the value odf values.
//or we can say that we can update value of values using setValues.

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

    // we are creating handleChange high order javascript function to handle all the changes , we can also define seprately but by universally handling all values will make things easy for us.
  //setvalues is the method inside handleChange function and (...values) gives up all existing values
  //here name(parameter of hanlechange function, we pass it in function function when we use thi function) will access all any thing inside values variable that we created eralier using usestate.
  //event is a parameter we passing in this method like(event can have value like onChange) etc
  //event.target is work as whereever any value will change it will update it using [name]:event.target.value.

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

//onSubmit  method is call when we will click on submit button after filling form.
// event is a parameter we passing in this method like(event can have value like onClick) etc
//
  const onSubmit = event => {
    event.preventDefault();   //default cation wgne will submitthe form can we prevent using this.
    setValues({ ...values, error: false });
    signup({ name, email, password })  // this is a signup that we have defined in auth.these bunch of parametes will fall in (user) parameter collectively in signup function in auth.
      .then(data => {
        if (data.error) {   // ifany error occur if will decide future of values
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({     //here now values are  still stored in name , emial  etc so will rest these valuesusing setValue.
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

//form for user to signup so we created signUpForm method

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
