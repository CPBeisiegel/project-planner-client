import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api";

export function Goals() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await api.get("/goals/my-goals");
        setGoals([...response.data]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGoals();
  }, []);

  return (
    <>
      <Button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          navigate("/create-goals");
        }}
      >
        Add nova meta
      </Button>
      <ul>
        {goals.map((currentGoal) => {
          return <li>{currentGoal.title}</li>;
        })}
      </ul>
    </>
  );
}
