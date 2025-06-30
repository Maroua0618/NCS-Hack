import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      mode === "signup"
        ? "http://localhost:5000/api/users"
        : "http://localhost:5000/api/users/login";

    const payload = mode === "signup"
      ? formData
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await axios.post(url, payload);
      console.log(response.data);

      if (mode === "login") {
        localStorage.setItem("token", response.data.token);
        alert("Logged in successfully!");
      } else {
        alert("Account created successfully!");
      }

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-sm">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={switchMode}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
