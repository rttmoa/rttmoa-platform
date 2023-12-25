import React from "react";

export default class ChildStatePropogation extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 30,
            designation: "Developer"
        }

        this.updateNameValues = this.updateNameValues.bind(this)

        setTimeout(() => {
            this.setState({
                name: "Anshul",
                age: 50
            })
        }, 4000);
    }

    
    render() {
        return (
            <div id="mainDiv"> 
                <b>This is Parent Component</b><hr></hr><br></br>
                <ChildComponent name={this.state.name} age={this.state.age} /><hr></hr><br></br>
            </div>
        )
    }
}

function ChildComponent(props) {
    return (
        <div>
            <b id="nameValue">User Name is: {props.name}</b><br></br>
            <OtherChildComponent age={props.age} />
        </div>
    )
}

function OtherChildComponent(props) {
    return (
        <div>
            <b id="ageValue">User Age is: {props.age}</b><br></br>
        </div>
    )
}