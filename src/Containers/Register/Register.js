import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { country_list } from "../../Data/countries";
import { validateLoginFormValues } from "../../Functions/form-utilities";
import AuthService from "../../Services/Travlog/AuthService";
import travlogLogo from "../../imgs/travlog-blue.png";
import "./Register.scss";

export default function Register() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    nationality: "",
    birthday: "",
  };

  const [birthDate, setBirthDate] = useState(new Date());
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [nationality, setNationality] = useState("");

  useEffect(() => {
    const userData = {
      email: formValues.email,
      name: formValues.name,
      password: formValues.password,
      nationality: nationality,
      birthday: birthDate.toISOString(),
    };

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      register(userData);
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

  const register = async (user_data) => {
    console.log(user_data);
    const res = await AuthService.register(user_data);

    return navigate("/login");
  };

  return (
    <div>
      <form className="login-root" onSubmit={handleSubmit} noValidate>
        <img src={travlogLogo} alt="" className="logo" />

        <label className="form-label" htmlFor="">
          NAME
        </label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="">
          EMAIL
        </label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="">
          PASSWORD
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="">
          NATIONALITY
        </label>
        <select
          className="form-input"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          {country_list.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label className="form-label" htmlFor="">
          BIRTHDAY
        </label>
        <DatePicker
          className="form-input birthday-input"
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
        />
        <button className="form-button" onClick={handleSubmit}>
          REGISTER
        </button>
      </form>
    </div>
  );
}
