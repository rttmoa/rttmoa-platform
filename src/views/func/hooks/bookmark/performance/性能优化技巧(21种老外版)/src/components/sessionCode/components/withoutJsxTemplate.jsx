import React from "react";

export default function WithoutJsxTemplate() {
    return React.createElement("div", {}, 
        React.createElement("div", {}, 
            React.createElement("b", {}, "Hello World")))
}