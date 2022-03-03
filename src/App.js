import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Goals } from "./pages/Goals";
import { CreateGoals } from "./pages/CreateGoals";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="/goals" element={<ProtectedRoute component={Goals} />} />
          <Route
            path="/create-goals"
            element={<ProtectedRoute component={CreateGoals} />}
          />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
