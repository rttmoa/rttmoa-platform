
import React from "react";

export default class NonMutableArrayUpdate extends React.Component {
    constructor() {
        super();
        this.state = {
            inputName: "",
            arrayData: ["Mayank", "Meha", "Anshul", "Arjun"]
        }
    }

    updateUserName(event) {
        this.setState({
            inputName: event.target.value
        })
    }

    addUserData() {
        this.setState({
            arrayData: [this.state.inputName, ...this.state.arrayData]
        })
    }

    render() {
        var dataList = this.state.arrayData.map((data, index) => {
            return <div>{data}</div>;
        })
        return (
            <div>
                <input type="text" value={this.state.inputName} placeholder="Enter Unique Name" onChange={this.updateUserName.bind(this)} />
                <input type="button" onClick={this.addUserData.bind(this)} value="Click To Add" /><br></br><br></br>
                <b>List of Users: </b><br></br><br></br>
                {dataList}<br></br>
            </div>
        )
    }
}

