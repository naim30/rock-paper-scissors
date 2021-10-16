import classes from "./Logo.module.css";
import paper from "../../assets/images/paper.svg";
import rock from "../../assets/images/rock.svg";
import scissor from "../../assets/images/scissor.svg";

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={paper} alt="logo" />
      <img src={rock} alt="logo" />
      <img src={scissor} alt="logo" />
    </div>
  );
};

export default logo;
