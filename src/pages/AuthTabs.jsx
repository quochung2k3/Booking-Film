import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function AuthTabs({ onLogin }) {
  const [activeTab, setActiveTab] = useState("signIn");
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });
  const navigate = useNavigate();

  const defaultAdmin = {
    username: "admin",
    password: "admin",
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = signInData;
    if (
      username === defaultAdmin.username &&
      password === defaultAdmin.password
    ) {
      onLogin(1, "admin-token");
      navigate("/admin");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email: username, password }
      );
      const { token } = response.data;
      onLogin(2, token);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const { fullName, username, password, confirmPassword } = signUpData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/v1/auth/signup", {
        email: username,
        password,
      });
      alert(`Sign-up successful for user: ${fullName}`);
    } catch (error) {
      alert("Sign-up failed");
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const { email } = forgotPasswordData;
    try {
      await axios.post("http://localhost:3000/api/v1/auth/forgot-password", {
        email,
      });
      alert(`Password reset link sent to: ${email}`);
    } catch (error) {
      alert("Failed to send password reset link");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabsContainer}>
        <button
          style={
            activeTab === "signIn"
              ? { ...styles.tabButton, ...styles.activeTab }
              : styles.tabButton
          }
          onClick={() => handleTabSwitch("signIn")}
        >
          Sign In
        </button>
        <button
          style={
            activeTab === "signUp"
              ? { ...styles.tabButton, ...styles.activeTab }
              : styles.tabButton
          }
          onClick={() => handleTabSwitch("signUp")}
        >
          Sign Up
        </button>
        <button
          style={
            activeTab === "forgotPassword"
              ? { ...styles.tabButton, ...styles.activeTab }
              : styles.tabButton
          }
          onClick={() => handleTabSwitch("forgotPassword")}
        >
          Forgot Password
        </button>
      </div>
      {activeTab === "signIn" && (
        <form onSubmit={handleSignInSubmit} style={styles.form}>
          <h2 style={styles.heading}>Sign In</h2>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={signInData.username}
              onChange={(e) =>
                setSignInData({ ...signInData, username: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      )}
      {activeTab === "signUp" && (
        <form onSubmit={handleSignUpSubmit} style={styles.form}>
          <h2 style={styles.heading}>Sign Up</h2>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Full Name:</label>
            <input
              type="text"
              value={signUpData.fullName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, fullName: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      )}
      {activeTab === "forgotPassword" && (
        <form onSubmit={handleForgotPasswordSubmit} style={styles.form}>
          <h2 style={styles.heading}>Forgot Password</h2>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={forgotPasswordData.email}
              onChange={(e) =>
                setForgotPasswordData({
                  ...forgotPasswordData,
                  email: e.target.value,
                })
              }
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage:
      'url("https://t4.ftcdn.net/jpg/06/89/49/95/360_F_689499531_MeYeI1VVavgYQRzz0S3JxkQ9VxzgYZQh.jpg")',
    backgroundSize: "cover",
  },
  tabsContainer: {
    display: "flex",
  },
  tabButton: {
    padding: "0.5rem 1rem",
    border: "none",
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
    outline: "none",
    borderRadius: "4px 4px 0 0",
    marginRight: "5px",
    color: "#333",
    transition: "background-color 0.3s, color 0.3s",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
    fontWeight: "bold",
    color: "#fff",
    borderBottom: "2px solid #4CAF50",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  heading: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1.5rem",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
    textAlign: "left",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "2px solid #ddd",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "0.7rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
    opacity: "0.8",
  },
};

export default AuthTabs;
