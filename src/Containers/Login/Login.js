import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/Travlog/AuthService";
import { validateLoginFormValues } from "../../Functions/form-utilities";
import TokenStorageService from "../../Services/Travlog/TokenStorageService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Features/loginSlice";

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
    <div className="login-root">
      <label htmlFor="">EMAIL</label>
      <input
        type="text"
        value={formValues.email}
        name="email"
        onChange={handleChange}
      />
      <label htmlFor="">PASSWORD</label>
      <input
        type="password"
        value={formValues.password}
        onChange={handleChange}
        name="password"
      />
      <button onClick={handleSubmit}>LOGIN</button>
    </div>
  );
}
