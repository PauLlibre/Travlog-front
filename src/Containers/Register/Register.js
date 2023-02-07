import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { country_list } from "../../Data/countries";
import { validateLoginFormValues } from "../../Functions/form-utilities";
import AuthService from "../../Services/Travlog/AuthService";

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
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="">NAME</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <label htmlFor="">EMAIL</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <label htmlFor="">PASSWORD</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <label htmlFor="">NATIONALITY</label>
        <select
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          {country_list.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label htmlFor="">BIRTHDAY</label>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
        />
        <button onClick={handleSubmit}>REGISTER</button>
      </form>
    </div>
  );
}
