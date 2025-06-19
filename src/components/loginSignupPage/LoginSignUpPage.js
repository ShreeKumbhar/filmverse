import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./LoginSignUpPage.css";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const LoginSignUpPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignUp && !formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
    if (isSignUp && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before proceeding.");
      return;
    }

    try {
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const requestData = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      console.log("Sending Request to:", `${API_BASE_URL}${endpoint}`);

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success(isSignUp ? "Signup successful! Redirecting..." : "Login successful!");

        setTimeout(() => {
          if (isSignUp) {
            setIsSignUp(false);
            setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          } else {
            localStorage.setItem("token", response.data.token || "");
            localStorage.setItem("userName", response.data.user?.name || formData.name);
            navigate("/");
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-signup-container">
      <ToastContainer />
      <div className="form-container">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        <p className="form-toggle" onClick={toggleForm}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          {isSignUp && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
          )}
          <button className="submit-button" type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
