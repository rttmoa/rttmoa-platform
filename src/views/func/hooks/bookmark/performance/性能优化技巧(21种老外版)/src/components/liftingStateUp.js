import React from "react";

export default class StateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "Mayank",
            age: 20
        }

        this.updateUserName = this.updateUserName.bind(this);
    }

    updateUserName(newUser, event) {
        this.setState({
            userName: newUser
        })
    } 

    render() {
        return (
            <div>
                <div>This is the Parent Element Containing Name and Age</div><br/>
                <b>User Name: {this.state.userName}</b><br/><br/>
                <b>User Age: {this.state.age}</b><br/><br/>

                <div>
                    <ChildElement name={this.state.userName} callbackFunction={this.updateUserName} />
                </div>
            </div>

        )
    }
}   

class ChildElement extends React.Component {
    render() {
        return (
            <div>
                <b>Child Name is: {this.props.name}</b><br/>
                <input type="button" value="Click To Change Parent" onClick={(event) => this.props.callbackFunction("Anshul", event)} />
            </div>
        )
    }
}