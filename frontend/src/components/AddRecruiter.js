import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./AddRecruiter.css";

const AddRecruiter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/admin/create-recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create recruiter");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-recruiter-container">
      <div className="back-button-container">
      <IoMdArrowRoundBack className="back-button" onClick={() => navigate("/home")}/>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Create Recruiter</h3>
        <label>Email:</label>
        <input
        className="add-recruiter-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
        className="add-recruiter-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Recruiter</button>
      </form>
    </div>
  );
};

export default AddRecruiter;
