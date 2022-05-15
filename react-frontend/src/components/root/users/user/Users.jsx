import React from "react";
import UserDataService from "../../../../api/users/UsersDataService";
import { useState, useLayoutEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    let unmounted = false;

    UserDataService().then((response) => {
      if (!unmounted) {
          setUsers(response.data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);
  return (
      <>
          <table>
              <thead>
              <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Role</th>
              </tr>
              </thead>
              <tbody>
              {users.map(user => {
                  return (
                      <tr key={user.username}>
                          <td> Username: {user.username} </td>
                          <td> Email: {user.email}</td>
                          <td> Full Name: {user.fullName} </td>
                          <td> Role: {user.role} </td>
                      </tr>
                  );
              })}
              </tbody>
          </table>
      </>
  );
};

export default Users;
