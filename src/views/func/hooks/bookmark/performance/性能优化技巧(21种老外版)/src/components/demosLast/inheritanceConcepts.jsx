import React from "react";

class Employee extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 10
        }
        
    }

    showEmployeeDetails() {
        console.log("User Name: " + this.state.name)
    }
}

export default class Manager extends Employee {


    showTeamSizeDetails() {
        console.log(this.state.teamSize)

        this.showEmployeeDetails();
    }

    render() {
        this.showTeamSizeDetails()
        return (
            <div>Team Size is: {this.state.name}</div>
        )
    }
}