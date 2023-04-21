import "./App.css";

import { useState } from "react";
import SpeechToText from "./SpeechToTextExample";
import SpeechToText2 from "./SpeechToText2";

import WavToTextExampleContinuous from "./WavToTextExampleContinuous";

const languages = ["zh-HK", "en-US", "fr-FR", "de-DE", "it-IT"];

function App() {
  const [speechLanguage, setSpeechLanguage] = useState(languages[0]);
  const [displayText, setDisplayText] = useState("");
  return (
    <div>
      <h1>Speech sample app</h1>
      <div style={{ marginBottom: 20 }}>
        <label>Speech language</label>
        <select
          id="speechLanguage"
          name="speechLanguage"
          value={speechLanguage}
          onChange={(e) => {
            setSpeechLanguage(e.target.value);
          }}
        >
          {languages.map((lang) => {
            return (
              <option key={lang} value={lang}>
                {lang}
              </option>
            );
          })}
        </select>
      </div>
      <div>recognizer as ref</div>
      {languages.map((lang) => {
        return speechLanguage === lang ? (
          <SpeechToText
            key={lang}
            lang={lang}
            setDisplayText={setDisplayText}
          />
        ) : null;
      })}
      <div style={{ marginTop: 30 }}>Speech config as Ref</div>
      <SpeechToText2 lang={speechLanguage} setDisplayText={setDisplayText} />

      <textarea
        name="displayText"
        rows={4}
        cols={40}
        value={displayText}
        onChange={(e) => setDisplayText(e.target.value)}
      />

      <WavToTextExampleContinuous />
    </div>
  );
}

export default App;
