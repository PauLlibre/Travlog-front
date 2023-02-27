import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/Travlog/AuthService";
import { validateLoginFormValues } from "../../Functions/form-utilities";
import TokenStorageService from "../../Services/Travlog/TokenStorageService";
import { useDispatch, useSelector } from "react-redux";
import travlogLogo from "../../imgs//travlog-blue.png";
import { login } from "../../Features/loginSlice";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const credentials = {
      email: formValues.email,
      password: formValues.password,
    };

    if (Object.keys(formErrors).length == 0 && isSubmit) {
      loginNow(credentials);
    }
  }, [formErrors]);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({
      ...formValues,

      [name]: value,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFormErrors(validateLoginFormValues(formValues));
    setIsSubmit(true);
  };

  const loginNow = async (credentials) => {
    try {
      const res = await AuthService.login(credentials);
      TokenStorageService.saveToken(res.data.token);
      TokenStorageService.saveLoggedUser(res.data.id);
      dispatch(login());

      switch (res.data.role) {
        case "user":
          return navigate("/");
        case "admin":
          return navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-background">
      <div className="form-header">
        <img src={travlogLogo} alt="" className="logo" />
      </div>
      <div className="login-root">
        <label className="form-label" htmlFor="">
          EMAIL
        </label>
        <input
          className="form-input"
          type="text"
          value={formValues.email}
          name="email"
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="">
          PASSWORD
        </label>
        <input
          className="form-input"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          name="password"
        />
        <button className="form-button" onClick={handleSubmit}>
          LOGIN
        </button>
      </div>
    </div>
  );
}
