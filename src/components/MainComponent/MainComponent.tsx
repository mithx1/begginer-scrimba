import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import styles from "./MainComponent.module.scss";
import MemeItem from "../MemeItem/MemeItem";

interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

const MainComponent: React.FC = () => {
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<MemeTemplate | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const memes = await ApiService.fetchMemes();
        setTemplates(memes);
      } catch (err) {
        setError("Failed to fetch memes");
      }
    };

    fetchMemes();
  }, []);

  const handleMemeClick = (meme: MemeTemplate) => {
    setSelectedMeme(meme);
  };

  return (
    <div className={styles["meme-container"]}>
      {error ? (
        <p className={styles["error-message"]}>{error}</p>
      ) : selectedMeme ? (
        <MemeItem
          id={selectedMeme.id}
          name={selectedMeme.name}
          url={selectedMeme.url}
          onClick={() => setSelectedMeme(null)}
        />
      ) : (
        templates.map((template) => (
          <MemeItem
            key={template.id}
            id={template.id}
            name={template.name}
            url={template.url}
            onClick={() => handleMemeClick(template)}
          />
        ))
      )}
    </div>
  );
};

export default MainComponent;
