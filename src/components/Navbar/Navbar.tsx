import React from "react";
import styles from "./Navbar.module.scss";
const Navbar: React.FC = () => {
  const newLocal = "/logo192.png";
  return (
    <nav className={styles.navBar}>
      <img src={newLocal} alt="logo" />
      <h3>Meme Generator Project</h3>
      <h4>React Project</h4>
    </nav>
  );
};

export default Navbar;
