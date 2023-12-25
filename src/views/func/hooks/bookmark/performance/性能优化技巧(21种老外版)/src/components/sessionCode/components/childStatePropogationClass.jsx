import React from "react";

export default class ChildStatePropogationClass extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            designation: "Developer"
        }

        setTimeout(() => {
            this.setState({
                name: "Anshul"
            })
        }, 4000);
    }

    updateName = () => {
        this.setState({
            name: "SXYSmccklsf"
        })
    }

    
    render() {
        return (
            <div id="mainDiv"> 
                <b>This is Parent Component</b><hr></hr><br></br>
                <ChildComponent name={this.state.name} age={this.state.age} updateName={this.updateName} /><hr></hr><br></br>
            </div>
        )
    }
}

class ChildComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            age: 30
        }
    }

    updateAge = () => {
        this.setState({
            age: 150
        })
    }

    render() {
        return (
            <div>
                <OtherChildComponent age={this.state.age} name={this.props.name} updateAge={this.updateAge} updateName={this.props.updateName}/>
            </div>
        )
    } 
}

function OtherChildComponent(props) {
    return (
        <div>
            <b id="ageValue">User Age is: {props.age}</b><br></br>
            <b id="nameValue">User Name is: {props.name}</b><br></br>
            <input type="button" value="Update Age" onClick={props.updateAge} />
            <input type="button" value="Update Name" onClick={props.updateName} />
        </div>
    )
}