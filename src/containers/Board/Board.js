import { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import fp from "fingerpose";

import classes from "./Board.module.css";
import ComputerMoves from "../../components/ComputerMoves/ComputerMoves";
import UserMoves from "../../components/UserMoves/UserMoves";
import { drawHand } from "../../Utility/utility";
import {
  paperGesture,
  scissorGesture,
  rockGesture,
} from "../../Utility/gestures";

class Board extends Component {
  state = {
    startGame: true,
    guessArr: [],
    showResult: false,
  };

  detect = async (model, webcamRef, canvasRef) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await model.estimateHands(video);
      // console.log(hand);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          rockGesture,
          paperGesture,
          scissorGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 8);
        console.log(gesture);
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandPose = async (webcamRef, canvasRef) => {
    const model = await handpose.load();
    setInterval(() => {
      this.detect(model, webcamRef, canvasRef);
    }, 100);
  };

  render() {
    return (
      <div className={classes.Board}>
        <ComputerMoves />
        <UserMoves />
        {/* runHandPose={this.runHandPose} */}
      </div>
    );
  }
}

export default Board;
