import classes from "./NavBar.module.css";
import Logo from "../Logo/Logo";

const navBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <Logo />
      <div className={classes.Instructions}>How to play ?</div>
    </div>
  );
};

export default navBar;
