import React from "react";


import styles from "../../../css/Account.module.css";
import UserDataService from "../../../api/users/UserDataService";
import { useState, useLayoutEffect } from "react";

const UsersHome = () => {
  const [user, setUser] = useState([]);

  useLayoutEffect(() => {
    let unmounted = false;

    UserDataService().then((response) => {
      if (!unmounted) {
        setUser(response.data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);
  return (
      <>

                <hr className={styles.account_hr}></hr>
                <br></br>
                <p> Username: {user.username} </p>
                <p> Email: {user.email}</p>
                <p> Full Name: {user.fullName} </p>
                <p> Role: {user.role} </p>
                <br></br>

      </>
  );
};

export default UsersHome;
