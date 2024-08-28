import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import styles from "./MainComponent.module.scss";
import MemeItem from "../MemeItem/MemeItem";

interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

const objectToQueryParam = (obj: { [key: string]: string | undefined }) => {
  const params = Object.keys(obj).map(
    (key) => `${key}=${encodeURIComponent(obj[key] ?? "")}`
  );
  return `?${params.join("&")}`;
};

const MainComponent: React.FC = () => {
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<MemeTemplate | null>(null);
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [customMeme, setCustomMeme] = useState<any>(null);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const params = {
      template_id: selectedMeme?.id,
      text0: topText,
      text1: bottomText,
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD,
    };

    try {
      const response = await fetch(
        `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`
      );
      const json = await response.json();
      setCustomMeme(json.data.url);
    } catch (error) {
      console.error("Error creating meme:", error);
    }
  };

  if (customMeme) {
    return (
      <div className={styles["meme-container"]}>
        <img src={customMeme} alt="Custom meme" />
        <MemeItem
          id="back"
          name="Back"
          url={customMeme}
          onClick={() => setCustomMeme(null)}
        ></MemeItem>
      </div>
    );
  }

  return (
    <div className={styles["meme-container"]}>
      <h1>Pick a meme</h1>
      {error ? (
        <p className={styles["error-message"]}>{error}</p>
      ) : selectedMeme ? (
        <form onSubmit={handleSubmit}>
          <MemeItem
            id={selectedMeme.id}
            name={selectedMeme.name}
            url={selectedMeme.url}
            onClick={() => setSelectedMeme(null)}
          />
          <div>
            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>
          <button type="submit">Create Meme</button>
        </form>
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
