import { FormField } from "../../components/FormField";
import { Button } from "../../components/Button";
import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export function CreateGoals() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", deadline: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/goals/create-goal", formData);
      console.log(response.data);
      navigate("/goals");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <h1> Adicionar uma nova meta! </h1>

      <form onSubmit={handleSubmit}>
        <FormField
          id="createGoalFormTitle"
          className="form-control"
          name="title"
          label="O que você tem como meta?"
          value={formData.title}
          onChange={handleChange}
          required={true}
        />

        <FormField
          id="createGoalFormDeadline"
          type="date"
          label="Até quando você quer realizar esse objetivo"
          className="form-control"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required={true}
        />

        <Button type="submit">Adicionar meta!</Button>
      </form>
    </div>
  );
}
