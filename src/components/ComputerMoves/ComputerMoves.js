import classes from "./ComputerMoves.module.css";

const computerMoves = (props) => {
  let arr = ["rock", "paper", "scissor"];
  return (
    <div className={classes.ComputerMoves}>
      <div className={classes.Counter}>{props.counter}</div>
      <img src={props.guess.image} alt={props.guess.name} />
      <div className={classes.Name}>{props.guess.name} </div>
    </div>
  );
};

export default computerMoves;
