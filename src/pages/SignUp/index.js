import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FormField } from "../../components/FormField";
import { ErrorAlert } from "../../components/ErrorAlert";

export function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!(form.password === form.confirmPassword)) {
      setError("Senha e confirmação não são iguais.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post("http://localhost:4000/api/v0/users/signup", form);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response);
        setError(error.response.data);
      } else {
        setError("Algo deu errado");
      }
    }
  }

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          id="signUpFormName"
          name="name"
          onChange={handleChange}
          value={form.name}
          required={true}
          readOnly={loading}
        />

        <FormField
          type="email"
          label="E-mail"
          id="signUpEmail"
          name="email"
          onChange={handleChange}
          value={form.email}
          required={true}
          readOnly={loading}
        />
        <FormField
          type="password"
          label="Senha"
          id="signUpPassword"
          required={true}
          readOnly={loading}
          name="password"
          value={form.password}
          onChange={handleChange}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        />

        <FormField
          type="password"
          label="Confirmação de senha"
          id="signUpConfirmPassword"
          required={true}
          readOnly={loading}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Cadastrar"
          )}
        </button>

        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
      </form>
    </div>
  );
}
