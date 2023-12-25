import React from "react";

export default function InlineStyleComponent(props) {

    var styleProperties = {
        boldElement: {
            "color": props.color,
            "borderColor": "red"
        }, divElement: {
            "color": "grey"
        }
    }

    var newName = "Mayank Gupta";

    var returnName = function() {
        return newName;
    }

    var color = props.color;

    return (
        <div>
            <h3 className="header">Parent Application</h3>
            <b style={{"color": color, "padding": "10px"}}>My Age is: {props.age}</b><br></br>
            <b style={styleProperties.boldElement}>My Name Is: {props.name}</b>
            <div style={styleProperties.divElement}>{returnName()}</div>
        </div>
    )
}