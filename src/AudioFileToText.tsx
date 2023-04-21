// import { useState, useEffect, useRef, useCallback } from "react";
// import * as fs from "fs";
// import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
// import { useDropzone } from "react-dropzone";

// const speechConfig = speechsdk.SpeechConfig.fromSubscription(
//   process.env.REACT_APP_SPEECH_KEY || "",
//   process.env.REACT_APP_SPEECH_REGION || ""
// );

// function AudioFileToText({
//   lang,
//   setDisplayText,
// }: {
//   lang: string;
//   setDisplayText: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     acceptedFiles.forEach((file) => {
//       const reader = new FileReader();

//       reader.onabort = () => console.log("file reading was aborted");
//       reader.onerror = () => console.log("file reading has failed");
//       reader.onload = () => {
//         // Do whatever you want with the file contents
//         const binaryStr = reader.result;
//         // Create the push stream we need for the speech sdk.
//         var pushStream = speechsdk.AudioInputStream.createPushStream();

//         // Open the file and push it to the push stream.
//         fs.createReadStream(filename)
//           .on("data", function (arrayBuffer) {
//             pushStream.write(arrayBuffer.buffer);
//           })
//           .on("end", function () {
//             pushStream.close();
//           });

//         // We are done with the setup
//         console.log("Now recognizing from: " + filename);

//         // Create the audio-config pointing to our stream and
//         // the speech config specifying the language.
//         var audioConfig = speechsdk.AudioConfig.fromStreamInput(pushStream);
//         const speechConfig = speechsdk.SpeechConfig.fromSubscription(
//           process.env.REACT_APP_SPEECH_KEY || "",
//           process.env.REACT_APP_SPEECH_REGION || ""
//         );

//         // Setting the recognition language to English.
//         speechConfig.speechRecognitionLanguage = "en-US";

//         // Create the speech recognizer.
//         var recognizer = new speechsdk.SpeechRecognizer(
//           speechConfig,
//           audioConfig
//         );
//         console.log("bufer", binaryStr);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   }, []);

//   const { getRootProps, getInputProps, open } = useDropzone({
//     onDrop,
//     noClick: true,
//     accept: {
//       "audio/mp3": [".mp3"],
//       "audio/wmv": [".wav"],
//     },
//   });

//   return (
//     <div {...getRootProps({ role: "button" })}>
//       <input {...getInputProps()} />
//       <button type="button" onClick={open}>
//         Upload audio file
//       </button>
//     </div>
//   );
// }

// export default AudioFileToText;

export {};
