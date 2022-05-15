import React from "react";
import styles from "../../../../css/Header.module.css";
import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <header className={styles.header}>

      <Navbar />
    </header>
  );
};

export default Header;
