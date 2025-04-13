import React from "react";
import "./button.scss";

// I added onClick? property here for handle the onClick event in the NoOrderStatus component for the button

type ButtonProps = {
  children: React.ReactNode;
  bgColor: string;
  color: string;
  onClick?: () => void;
};

const Button = ({
  children,
  bgColor,
  color,
  onClick

}: ButtonProps): React.JSX.Element => {
  return (
    <button className="btn" style={{ backgroundColor: bgColor, color: color }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
