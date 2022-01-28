import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };

  const getUsername = () => {
    const usernameString = localStorage.getItem('username');
    return usernameString;
  };

  const [username, setUsername] = useState(getUsername());
  const [token, setToken] = useState(getToken());

  const connect = (userToken, userName) => {
    disconnect();
    //localStorage.clear()
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
    setToken(userToken);
    setUsername(userName);
  };

  const disconnect = () => {
    localStorage.clear()
    setToken(null);
    setUsername(null);
  };

  return {
    disconnect,
    connect,
    token,
    username,
  };
}
