import React from "react";

export default function UpdatingProps(props) {

    // props.name = "Data";

    props.details.name = "Anshul";

    alert(props.style.color)

    return (
        <div>
            <b>The Name is {props.details.name}</b>
        </div>
    )
}