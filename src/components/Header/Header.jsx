import React, { useState } from "react";
import i18next from "i18next";
import "./Header.css";

const languageOptions = [
  { lang: "English", value: "en" },
  { lang: "German", value: "de" },
];

function Header() {
  const [langVal, setLangVal] = useState("en");
  const handleLanguageChange = (e) => {
    setLangVal(e.target.value);
    i18next.changeLanguage(e.target.value);
  };
  return (
    <div className="header">
      <a href="https://www.bluestacks.com" className="logo-block">
        <img
          src="https://cdn-www.bluestacks.com/bs-images/bs-logo-new.png"
          height="38"
          width="134"
          className="img-responsive logo-img"
          alt="BlueStacks Android Emulator"
        />
      </a>
      <div>
        <select
          className="language-select"
          value={langVal}
          onChange={handleLanguageChange}
        >
          {languageOptions.map((language) => (
            <option key={language.value} value={language.value}>
              {language.lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Header;
