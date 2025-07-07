import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/Register";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  console.log("Current token:", token);

  return (
    <Router>
      <Routes>
        {/* If token exists, redirect to Home, otherwise show Login */}
        <Route
          path="/login"
          element={
            !token ? <LoginForm setToken={setToken} /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/register"
          element={
            !token ? <RegisterForm setToken={setToken} /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            token ? (
              <Home token={token} setToken={setToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
