import { useRef } from "react";
import Webcam from "react-webcam";

import classes from "./userMoves.module.css";

const UserMoves = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //   props.runHandPose(webcamRef, canvasRef);

  return (
    <div className={classes.UserMoves}>
      {/* <Webcam ref={webcamRef} mirrored={true} className={classes.Webcam} /> */}
      <canvas ref={canvasRef} className={classes.Canvas} />
    </div>
  );
};

export default UserMoves;
