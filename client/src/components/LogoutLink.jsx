import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const LogoutLink = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.logOut();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Link to="/login" onClick={handleLogout}>
      {" "}
      {children}{" "}
    </Link>
  );
};

export default LogoutLink;
