import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { ChangeEvent, useEffect, useState } from "react";

export default function WavToTextExampleContinuous() {
  const [recognizedText, setRecognized] = useState("");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText((prev) => `${prev} ${recognizedText}`.trim());
  }, [recognizedText, setDisplayText]);

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

    recognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        setRecognized(e.result.text);
      } else if (e.result.reason === sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    recognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason === sdk.CancellationReason.Error) {
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

    recognizer.speechEndDetected = () => {
      console.log("detected ended");
    };

    recognizer.startContinuousRecognitionAsync();
  }
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        React Example: Wav file to text with continuous recognition
      </div>
      <div>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="audio/wav"
          onChange={fileChange}
        />
      </div>
      <textarea
        name="note"
        rows={10}
        cols={80}
        value={displayText}
        onChange={(e) => setDisplayText(e.target.value)}
      />
    </div>
  );
}
