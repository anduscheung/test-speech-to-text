import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { ChangeEvent } from "react";
const { useEffect, useState } = require("react");

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.REACT_APP_SPEECH_KEY || "",
  process.env.REACT_APP_SPEECH_REGION || ""
);
speechConfig.speechRecognitionLanguage = "en-US";

export default function WavToTextExample() {
  const [result, setResult] = useState("");

  async function fileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const audioFile = event.target.files[0];
    console.log(audioFile);

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.REACT_APP_SPEECH_KEY || "",
      process.env.REACT_APP_SPEECH_REGION || ""
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.speechRecognitionLanguage = "en-US";

    let audioConfig = sdk.AudioConfig.fromWavFileInput(audioFile);
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result) => {
      let displayText;
      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        displayText = `RECOGNIZED: Text=${result.text}`;
      } else {
        displayText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }

      console.log(displayText);

      setResult(displayText);
    });
  }
  return (
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="audio/wmv"
        onChange={fileChange}
      />
      {result}
    </div>
  );
}
