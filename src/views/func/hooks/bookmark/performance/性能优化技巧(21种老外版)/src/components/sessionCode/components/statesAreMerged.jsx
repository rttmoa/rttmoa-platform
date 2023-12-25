import React from "react";

export default class StateAreMerged extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 30,
            designation: "Developer"
        }
    }

    updateValues = () => {

        this.setState({
            age: this.state.age + 1,
            xyz: 1
        })
    }

    render() {
        return (
            <div>
                <b>User Name is: {this.state.name} XYZ: {this.state.xyz}</b>
                <b>User Age is: {this.state.age}</b>
                <input type="button" value="Click" onClick={this.updateValues} />
            </div>
        )
    }
}