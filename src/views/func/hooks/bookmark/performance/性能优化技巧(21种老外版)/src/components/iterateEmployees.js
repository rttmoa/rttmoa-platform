import React from 'react';
import JSON from "./employees.json"

export default class EmployeeList extends React.Component {
    constructor() {
        super();
        this.state = {
            employeeList: JSON.employeeList
        }
    }

    renderEmployeeList() {
        return this.state.employeeList.map((employee) => {
            return (
                <div style={{borderBottom: '1px solid red', padding: '10px'}}>
                    <div>Employee Name: {employee.name}</div>
                    <div>Employee Age: {employee.age}</div>
                    <div>Employee Designation: {employee.designation}</div>
                </div>
            )
        });
    }

    renderEmployeeListOther() {

        var filteredArray = []
        this.state.employeeList.forEach(employee => {
            filteredArray.push(
                <div style={{borderBottom: '1px solid red', padding: '10px'}}>
                    <div>Employee Name: {employee.name}</div>
                    <div>Employee Age: {employee.age}</div>
                    <div>Employee Designation: {employee.designation}</div>
                </div>
            )
        });

        return filteredArray;
    }

    render() {
        return (
            <div>
                {this.renderEmployeeListOther()}
            </div>
        )
    }
}