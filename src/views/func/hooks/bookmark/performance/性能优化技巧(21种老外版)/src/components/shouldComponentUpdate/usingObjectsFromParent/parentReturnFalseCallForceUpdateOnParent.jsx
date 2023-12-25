/*

If the object is sent from the Parent and the changes are made to the Component Parent Property
If the ShouldComponentRender returns false, then the Child wont be rerendered along with the parent.

*/

import React from "react";

export default class parentReturnFalseCallForceUpdateOnParent extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: "Mayank",
                age: 30
            }
        }

        setTimeout(() => {
            this.setState({
                userInfo: {
                    name: "Anshul"
                }
            })
        }, 4000);
    }

    clickEventUpdate = () => {

        this.forceUpdate();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div>
                <h1 style={{"color": "red"}}>Parent Component Values:</h1>
                <h2>User Name: {this.state.userInfo.name}</h2>
                <input type="button" value="Click to Update" onClick={this.clickEventUpdate} /><hr></hr>
                <ChildReturnTrue userInfo={this.state.userInfo}></ChildReturnTrue>
            </div>
        );
    }
}

class ChildReturnTrue extends React.Component {

    componentWillUpdate() {
        console.log("This function is not called on Change of Parent State.");
    }
    
    constructor() {
        super();
        this.state = {
            age: 10
        }
    }

    render() {
        return (
            <>
                <h1 style={{"color": "green"}}>Child Component:</h1>
                <h2>User Name from Parent: {this.props.userInfo.name}</h2>
                <h2>User Age from State: {this.state.age}</h2>
            </>
        )
    }
} 