import { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

import "./App.css";
import { drawHand } from "./utility";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const detect = async (model) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await model.estimateHands(video);
      console.log(hand);
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  const runHandPose = async () => {
    const model = await handpose.load();
    setInterval(() => {
      detect(model);
    }, 100);
  };

  runHandPose();

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        mirrored={true}
        className="Webcam"
        height={100 + "%"}
        width={100 + "%"}
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} className="Canvas" />
    </div>
  );
}

export default App;
