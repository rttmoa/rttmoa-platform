import React from "react";
import { Card } from "antd";
import { Container } from "postcss"; // <Container></Container>
// import InfTable from "./InfTable2";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

export const ThemeContext = React.createContext(themes.light);

const Table: React.FC = () => {
  const columnList = [
    { name: "column1", length: 30 },
    { name: "column2", length: 30 },
    { name: "column3", length: 30 },
    { name: "column4", length: 20 },
    { name: "column5", length: 20 }
  ];
  return (
    <>
      <ThemeContext.Provider value={themes.dark}>
        <div className="App">{/* <InfTable /> */}</div>
      </ThemeContext.Provider>
    </>
  );
};

export default Table;

// todo styled-components 使用
// type ContainerProps = {
//   height: string;
//   width: string;
//   background: string;
// };
// const Container = styled.div<ContainerProps>`
//   height: ${(props: any) => props.height};
//   width: ${(props: any) => props.width};
//   background: ${(props: any) => props.background};
// `;
// const ContentContainer: ContainerProps = {
//   height: "95vh",
//   width: "100%",
//   background: "white"
// };
// <div>
//   <Container {...ContentContainer}>{"...."}</Container>
// </div>;
