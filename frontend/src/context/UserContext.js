import React, { createContext, useState } from 'react';
import getUserName from '../utils/getUserName';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const username = getUserName();
  const [user, setUser] = useState(username);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
};

export {UserProvider, UserContext};