import React, { useState } from "react";

export default function MessageBox(props) {
  const [show, setShow] = useState(true);

  const handleAlert = () => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  handleAlert();
  if (show) {
    return (
      <div className={`alert alert-${props.variant || "info"}`}>
        {props.children}
      </div>
    );
  } else {
    return null;
  }
}
