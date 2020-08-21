import React, { FC, useState, PropsWithChildren } from "react";
import { useAuth } from "../context/useAuth";

type LoginProps = {};

export const Login: FC<PropsWithChildren<LoginProps>> = (props) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("chnirt@gmail.com");
  // const [username, setUsername] = useState("development.account@urbanos.io");

  function handleLogin() {
    fetch("https://xj579.sse.codesandbox.io/token", {
      method: "post",
      body: JSON.stringify({ username })
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((res) => res.json())
      .then((data) => {
        const { token } = data;
        login?.(username, token);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div>
      LoginScreens
      <br />
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
