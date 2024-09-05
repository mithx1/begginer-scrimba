import React from "react";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logo512.png";
const Navbar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <img src={logo} alt="logo" />
      <h3>Meme Generator Project</h3>
      <h4>React Project</h4>
    </nav>
  );
};

export default Navbar;
