import { Component } from "react";

import classes from "./Layout.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Board from "../Board/Board";

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <NavBar />
        <Board />
      </div>
    );
  }
}

export default Layout;
