import React from "react";


export default function HigherOrderComponent(WrapperComponent) {
    return class EmployeeInfo extends React.Component {

        constructor() {
            super();
            this.state = {
                employeeDetails: {}
            }
        }
        getUserData() {
            return {
                name: "Mayank",
                age: 10, 
                designation: "Developer",
                salary: 10000,
                bonus: 2000
            }
        }
    
        componentDidMount() {
            this.setState = {
                employeeDetails: this.getUserData()
            }
        }
    
        render() {
            return <WrapperComponent></WrapperComponent>
        }
    }
}
