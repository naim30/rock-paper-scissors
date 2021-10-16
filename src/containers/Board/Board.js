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
    counter: 3,
    selectArr: [
      { name: "rock", image: rockImg },
      { name: "paper", image: paperImg },
      { name: "scissor", image: scissorImg },
    ],
    guess: { name: "rock", image: rockImg },
    guessArr: [],
    startGuess: false,
  };

  interval = null;
  interval1 = null;
  interval2 = null;

  counterHandler = () => {
    if (this.state.startCounter && this.state.counter === 3) {
      this.interval = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState((prevState) => {
            return {
              counter: prevState.counter - 1,
            };
          });
        } else {
          this.setState({
            startCounter: false,
          });
          clearInterval(this.interval);
        }
      }, 1000);
    }
  };

  changeImageHandler = () => {
    if (this.state.startCounter && this.state.counter === 3) {
      this.interval1 = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState((prevState) => {
            let guess = null;
            while (1) {
              let guessItem =
                prevState.selectArr[
                  Math.floor(Math.random() * prevState.selectArr.length)
                ];
              if (prevState.guess.name !== guessItem.name) {
                guess = guessItem;
                return {
                  guess: guess,
                };
              }
            }
          });
        } else {
          clearInterval(this.interval1);
        }
      }, 100);
    }
  };

  componentDidMount() {
    this.counterHandler();
    this.changeImageHandler();
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

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          rockGesture,
          paperGesture,
          scissorGesture,
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 8);
        console.log(gesture);

        let guessArr = [...this.state.guessArr];
        guessArr.push(gesture.gestures);
        this.setState({ guessArr: guessArr });
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandPose = async (webcamRef, canvasRef) => {
    const model = await handpose.load();
    this.interval2 = setInterval(() => {
      if (this.state.counter === 0 && this.state.guessArr.length < 20) {
        this.detect(model, webcamRef, canvasRef);
      } else {
        clearInterval(this.interval2);
      }
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
