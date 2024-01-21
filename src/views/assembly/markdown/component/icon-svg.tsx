import React from "react";

type StateType = {
  className?: string;
  iconName: string;
};
type propType = {
  className?: string;
  iconName: string;
};

class IconSvg extends React.Component<StateType, propType> {
  render() {
    let { className = "", iconName = "" } = this.props;
    return (
      <svg style={{ width: "16px", height: "16px" }} className={`icon ${className}`} aria-hidden="true">
        <use xlinkHref={`#icon-${iconName}`}></use>
      </svg>
    );
  }
}

export default IconSvg;
