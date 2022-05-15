import React from "react";
import { useLocation } from "react-router-dom";
import AuthenticationService from "../../../../../../api/authentication/AuthenticationService";
import { NavLink } from "react-router-dom";
import styles from "../../../../../../css/Navbar.module.css";

const NavLinks = () => {
  const userLogged = AuthenticationService.isUserLoggedIn();
  const adminLogged = AuthenticationService.isAdminLoggedIn();
  const location = useLocation();

  return (
    <>
      {userLogged && (
        <ul className={styles.nav_links}>
          <li className={styles.nav_link}>
            <NavLink to="user-home" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className={styles.nav_link}>
            <NavLink to="articles" className="nav-link">
              Articles
            </NavLink>
          </li>

          <li
            className={styles.nav_link}
            onClick={AuthenticationService.logout}
          >
            <NavLink to="/"> Logout</NavLink>
          </li>
        </ul>
      )}

      {adminLogged && (
          <ul className={styles.nav_links}>
            <li className={styles.nav_link}>
              <NavLink to="admin-home" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className={styles.nav_link}>
              <NavLink to="articles" className="nav-link">
                Articles
              </NavLink>
            </li>
            <li className={styles.nav_link}>
              <NavLink to="users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li
                className={styles.nav_link}
                onClick={AuthenticationService.logout}
            >
              <NavLink to="/"> Logout</NavLink>
            </li>
          </ul>
      )}

      {!userLogged && !adminLogged && (
        <ul className={styles.nav_links}>
          {location.pathname !== "/signup" && location.pathname !== "/" && (
            <li className={styles.nav_link}>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
          )}
          {location.pathname !== "/login" && (
            <li className={styles.nav_link}>
              <NavLink to="login">Login</NavLink>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default NavLinks;
