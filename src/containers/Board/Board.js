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
import paperImg from "../../assets/images/paper.svg";
import rockImg from "../../assets/images/rock.svg";
import scissorImg from "../../assets/images/scissor.svg";

class Board extends Component {
  state = {
    startCounter: true,
    counter: 10,
    selectArr: [
      { name: "rock", image: rockImg },
      { name: "paper", image: paperImg },
      { name: "scissor", image: scissorImg },
    ],
    guess: { name: "rock", image: rockImg },
  };

  interval = null;

  counterHandler = () => {
    if (this.state.startCounter && this.state.counter === 10) {
      console.log("hello");
      this.interval = setInterval(() => {
        if (this.state.counter > 1) {
          this.setState((prevState) => {
            return {
              counter: prevState.counter - 1,
            };
          });
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  };

  componentDidMount() {
    this.counterHandler();
  }

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
        <ComputerMoves counter={this.state.counter} guess={this.state.guess} />
        <UserMoves />
        {/* runHandPose={this.runHandPose} */}
      </div>
    );
  }
}

export default Board;
