import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("🔥 LOGIN BUTTON CLICKED");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("🔐 Login Response:", data);

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", String(data.user.id));
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name);

      console.log("✅ Login successful");
      console.log("👤 User:", data.user);
      console.log("🎟️ Token saved");

      alert("Login successful!");

    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("Cannot connect to backend. Make sure your server is running.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("🔥 SIGNUP BUTTON CLICKED");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("📝 Signup Response:", data);

      if (!response.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      // Switch to Login
      setState("Login");

      // Clear fields
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("❌ Signup Error:", error);
      alert("Cannot connect to backend.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">

        <h1>{state}</h1>

        <form
          onSubmit={
            state === "Login"
              ? handleLogin
              : handleSignup
          }
        >

          <div className="loginsignup-fields">

            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button type="submit">
            {state === "Sign Up"
              ? "Continue"
              : "Login"}
          </button>

        </form>

        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>
              Click here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input
            type="checkbox"
            id="agree"
          />

          <p>
           By continuing, I agree to the terms of use &
            privacy policy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;