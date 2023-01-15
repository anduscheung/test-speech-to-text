import "./App.css";

import { useState } from "react";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function App() {
  const [guessText, setGuessText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    process.env.REACT_APP_SPEECH_KEY,
    process.env.REACT_APP_SPEECH_REGION
  );

  speechConfig.speechRecognitionLanguage = "en-US";

  const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  const sttFromMicContinuous = () => {
    recognizer.startContinuousRecognitionAsync();
  };

  recognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    setGuessText(e.result.text);
  };

  recognizer.recognized = (s, e) => {
    if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      setDisplayText(e.result.text);
    } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be recognized.");
    }
  };

  recognizer.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);

    if (e.reason === speechsdk.CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
      console.log(
        "CANCELED: Did you set the speech resource key and region values?"
      );
    }

    recognizer.stopContinuousRecognitionAsync();
  };

  recognizer.sessionStopped = (s, e) => {
    console.log("\n    Session stopped event.");
    recognizer.stopContinuousRecognitionAsync();
  };
  return (
    <div>
      <h1>Speech sample app</h1>

      <div>
        {isRecording
          ? "Recording... click stop when you're done to save money"
          : 'Click "Start recording" to start'}
        <div>
          <button
            onClick={() => {
              sttFromMicContinuous();
              setIsRecording(true);
            }}
          >
            Start recording
          </button>
          <button
            onClick={() => {
              recognizer.stopContinuousRecognitionAsync(() => {
                console.log("stop");
                setIsRecording(false);
              });
            }}
          >
            Stop recording
          </button>
        </div>
        <div>
          <div>recognizing: {guessText}</div>
          <div>final result: {displayText}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
