import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [download, setDownload] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, download, setDownload }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
