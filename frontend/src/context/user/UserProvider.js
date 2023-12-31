import React, { useState, useEffect } from "react";
import userContext from "./userContext";
import axios from "axios";
const UserProvider = (props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [user, setUser] = useState({ loading: true, data: null });

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getUser();
    } else {
      setUser({ ...user, loading: false });
    }
  }, []);

  // Get logged in user
  const getUser = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/user/getuser`,
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((response) => {
        // console.log("User: ", response);
        setUser({ loading: false, data: response?.data });
      })
      .catch((error) => {
        setUser({ loading: true, data: null });
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
