import React from "react";

export default class IterateData extends React.Component {

    constructor() {
        super();
        this.state = {
            empArray: [{
                id: 1,
                name: "A",
                age: 20, 
                designation: "AB"
            }, {
                id: 2,
                name: "B",
                age: 20, 
                designation: "AB"
            }, {
                id: 3,
                name: "C",
                age: 20, 
                designation: "AB"
            }, {
                id: 4,
                name: "D",
                age: 20, 
                designation: "AB"
            }]
        }
    }

    addEmployee = () => {


        this.setState({
            empArray: [...this.state.empArray, {
                id: this.state.empArray.length + 1,
                name: "Added",
                age: 20, 
                designation: "ABsdsd"
            }]
        });
    }

    render() {
        return (
                <div>
                    {this.state.empArray.map((employee, index) => {
                        return (
                            <div id={employee.id}>
                                <input type="text" /><br></br>
                                Name: <b>{employee.name}</b><br></br><br></br>
                                Age: <b>{employee.age}</b><br></br><br></br>
                                Designation: <b>{employee.designation}</b><hr></hr><br></br><br></br>
                            </div>
                        )
                    })}

                    <div>
                        <p>
                            <label>Enter Name Employee Name: </label>
                            <input type="button" onClick={this.addEmployee} value="Add Employee" />
                        </p>
                    </div>
                </div>
            )
        }
}