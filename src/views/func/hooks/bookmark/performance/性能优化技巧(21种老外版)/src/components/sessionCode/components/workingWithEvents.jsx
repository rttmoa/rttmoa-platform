import React from "react";

export default class WorkingWithEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 30,
            designation: "Developer"
        }

        this.updateNameValues = this.updateNameValues.bind(this)
    }

    updateValues = (event) => {

        this.setState({
            age: this.state.age + 1,
        })
    }

    updateNameValues() {
        this.setState({
            name: this.state.name + " XYZ",
        })
    }

    detectTarget = (event) => {
        debugger;
        alert("target is: " + event.target.id)
    }

    render() {
        return (
            <div id="mainDiv" onClick={this.detectTarget}> 
                <b id="nameValue">User Name is: {this.state.name}</b><br></br>
                <b id="ageValue">User Age is: {this.state.age}</b><br></br>
                <input id="AgeChangeButton" type="button" value="Click for Age Udate" onClick={this.updateValues} /><br></br>
                <input id="NameChangeButton" type="button" value="Click for Name Update" onClick={this.updateNameValues} />
            </div>
        )
    }
}