import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";

const Login = (props) => {
  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { password, email } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    loginUser({ email, password });
    clearError();
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />

        <input type="submit" value="Sign In" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger">
            {errors.msg ? errors.msg : errors.error[0].msg}
            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
