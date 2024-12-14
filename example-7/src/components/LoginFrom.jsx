import React from "react";
import PropsTypes from "prop-types";

function LoginFrom({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) {
  LoginFrom.propsTypes = {
    handlePasswordChange: PropsTypes.func.isRequired,
    handleSubmit: PropsTypes.func.isRequired,
    handleUsernameChange: PropsTypes.func.isRequired,
    username: PropsTypes.string.isRequired,
    password: PropsTypes.string.isRequired,
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username{" "}
          <input
            data-testid="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password{" "}
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginFrom;
