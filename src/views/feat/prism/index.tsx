/* eslint-disable prettier/prettier */
import React from "react";
import { Pre, Line, LineNo, LineContent } from "./style.ts";
import { Highlight, themes } from "prism-react-renderer";
import { Card } from "antd";
// import theme from "prism-react-renderer";

// https://codesandbox.io/p/sandbox/prism-react-renderer-example-u6vhk
const PrismRender = (): any => {
  const exampleCode = `
import React, { useState } from "react"; 

function Example() {
  const [count, setCount] = useState(0); 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();
  return (
    <>
      <Card>
        <h2>Welcome to prism-react-renderer!</h2>
        <Highlight theme={themes.nightOwl} code={exampleCode} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
            <Pre className={className} style={style}>
              {tokens.map((line: any[], i: number) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token: any, key: React.Key | null | undefined) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      </Card>
    </>
  );
};

export default PrismRender;
