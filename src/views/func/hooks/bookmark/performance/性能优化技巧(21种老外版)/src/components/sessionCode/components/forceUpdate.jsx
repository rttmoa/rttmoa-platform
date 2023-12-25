import React from "react";

export default class ForceUpdate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    updateData = () => {
        alert("Button Clicked")
        this.state.name = "Anshul";
        this.forceUpdate();
    }

    render() {

        if(this.state.name != "Mayank") {
            return null;
        }
        
        return (
            <div>
                { (this.state.name === "Mayank") ? <h1>User</h1>: <h2>Guest</h2> }
                { this.state.name === "Mayank" && <div><b>Current Name is: {this.state.name}</b><br></br><br></br></div> }
                <input type="button" value="Update" onClick={this.updateData} />
            </div>
        )
    }
}