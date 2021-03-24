import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
export default function SideBarMenu() {
  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "20px",
      height: "20px",
      left: "20px",
      top: "15px",
    },
    bmBurgerBars: {
      background: "#ffffff",
    },
    bmBurgerBarsHover: {
      background: "#ffa806",
    },
    bmCrossButton: {
      height: "20px",
      width: "20px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#203040",
      padding: "2em 1em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0em",
    },
    bmItem: {
      display: "block",
    },
  };

  return (
    <div>
      <Menu styles={styles}>
        <div>
          <Link to="/home/electronics" className="menu">
            Electronics
          </Link>
        </div>
        <div>
          <Link to="/home/clothes" className="menu">
            Clothes
          </Link>
        </div>
      </Menu>
    </div>
  );
}
