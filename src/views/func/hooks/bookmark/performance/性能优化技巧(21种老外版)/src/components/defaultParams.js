import React from "react";

export default function DefaultParams(props) {
    return (
        <div>
            <div>Hello This is the Parent Component</div>
            <div>Salutation Message: {props.name ? props.name : 'Guest'}</div>
        </div>
    )
}