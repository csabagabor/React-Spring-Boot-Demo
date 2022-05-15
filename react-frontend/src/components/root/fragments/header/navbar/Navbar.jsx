import React from "react";
import styles from "../../../../../css/Navbar.module.css";
import "@ionic/react/css/core.css";
import NavLinks from "../navbar/navLinks/NavLinks";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLinks />
    </nav>
  );
};

export default Navbar;
