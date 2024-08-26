import React from "react";
import styles from "./MemeItem.module.scss";

interface MemeItemProps {
  id: string;
  name: string;
  url: string;
  onClick: () => void;
}

const MemeItem: React.FC<MemeItemProps> = ({ id, name, url, onClick }) => {
  return (
    <div className={styles["meme-item"]} key={id} onClick={onClick}>
      <img className={styles["meme-image"]} src={url} alt={name} />
      <h4 className={styles["meme-title"]}>{name}</h4>
    </div>
  );
};

export default MemeItem;
