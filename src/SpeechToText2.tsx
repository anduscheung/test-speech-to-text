import { useState, useEffect, useRef } from "react";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();

function SpeechToText2({
  lang,
  setDisplayText,
}: {
  lang: string;
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const speechConfig = useRef(
    speechsdk.SpeechConfig.fromSubscription(
      process.env.REACT_APP_SPEECH_KEY || "",
      process.env.REACT_APP_SPEECH_REGION || ""
    )
  );

  speechConfig.current.speechRecognitionLanguage = lang;
  const recognizer = useRef(
    new speechsdk.SpeechRecognizer(speechConfig.current, audioConfig)
  );
  const [guessText, setGuessText] = useState("");

  const [recognizedText, setRecognized] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    setDisplayText((prev) => `${prev} ${recognizedText}`.trim());
  }, [recognizedText, setDisplayText]);

  const sttFromMicContinuous = () => {
    recognizer.current.startContinuousRecognitionAsync();
  };
  const endMicSession = () => {
    console.log("end mic session");
    recognizer.current.stopContinuousRecognitionAsync(() =>
      console.log("---->>>> stopped")
    );
    console.log("test end");
  };

  recognizer.current.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    setGuessText(e.result.text);
  };

  recognizer.current.recognized = (s, e) => {
    if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
      console.log(`RECOGNIZED: Text=${e.result.text}`);
      setRecognized(e.result.text);
    } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be recognized.");
    }
  };

  recognizer.current.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);

    if (e.reason === speechsdk.CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
    }

    recognizer.current.stopContinuousRecognitionAsync();
  };

  return (
    <div>
      {isRecording ? "Recording..." : 'Click "Start recording" to start'}
      <div>
        <div style={{ display: "flex" }}>
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
                endMicSession();
                setIsRecording(false);
              }}
            >
              Stop recording
            </button>
          </div>
        </div>
        <div>
          <div>recognizing: {guessText}</div>
          <div>final result: {recognizedText}</div>
        </div>
      </div>
    </div>
  );
}

export default SpeechToText2;
