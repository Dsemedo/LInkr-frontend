import { useState, createContext } from "react";

const Context = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [config, setConfig] = useState({});

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        config,
        setConfig,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
