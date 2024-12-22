import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [countLeft, setCountLeft] = useState(false);

  const [download, setDownload] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        msg,
        setMsg,
        download,
        setDownload,
        countLeft,
        setCountLeft,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
