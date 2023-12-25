import React from "react";

export  function ParentChildComponent(props) {
    return (
        <div>
            <h1>This is the Parent Component</h1>
            <HeaderComponent />
            <ContentComponent name={props.name} />
            <FooterComponent />
        </div>
    )
}

function HeaderComponent(props) {
    return <h2>This is Header Component</h2>
}

function FooterComponent(props) {
    return <h2>This is Footer Component</h2>
}

function ContentComponent(props) {
    return <h1>Hello {props.name}</h1>
}