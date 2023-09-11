import React, {useState} from "react";
import {UserContext} from "./AllContexts";

const UserStateContext = (props) => {

  const [userData , setUserData] = useState();
  const [accessToken , setAccessToken] = useState();

  return (
    <UserContext.Provider value={{ userData , setUserData , accessToken , setAccessToken}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStateContext;
