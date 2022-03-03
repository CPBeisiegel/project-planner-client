import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Button } from "../Button";

export function Navbar() {
  const { loggedInUser } = useContext(AuthContext);
  const [loginState, setLoginState] = useState(loggedInUser);
  const navigate = useNavigate();

  // toda vez que o loginUser muda de valor, ele muda e seta o state
  useEffect(() => {
    setLoginState(loggedInUser);
  }, [loggedInUser]);

  // estamos extraindo o usuario logado usando o authcontext
  /*   const { loggedInUser } = useContext(AuthContext); */

  // função de loggedOut
  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoginState(null);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarTogglerDemo01"
        >
          <Link className="navbar-brand" to={loginState ? "/dashboard" : "/"}>
            Vita Auctor Planner
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to={loginState ? "/goals" : "/login"}
              >
                {loginState ? "Goals" : "Login"}
              </Link>
            </li>
            <li className="nav-item">
              {loginState ? (
                <Button
                  type="button"
                  onClick={handleLogOut}
                  className="btn btn-light"
                >
                  Sair
                </Button>
              ) : (
                <Link className="nav-link" to="/signup">
                  Cadastro
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
