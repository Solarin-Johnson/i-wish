import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");

  const [download, setDownload] = useState(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, msg, setMsg, download, setDownload }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
