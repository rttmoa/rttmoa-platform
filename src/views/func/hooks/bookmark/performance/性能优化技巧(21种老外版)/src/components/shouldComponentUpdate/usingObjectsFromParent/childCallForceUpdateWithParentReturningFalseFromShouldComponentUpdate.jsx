/*

Over here the consideration that need to be made is that the Objec can be passed to the Child Component from Parents
If the data is changes to the Object property in the Child then the original data changes, since it is by reference.

The data changes into the parent object, but it is not updated untill the parent calls for "forceUpdate"

Change in Props value will not trigger the update to the Parent Component..

*/

import React from "react";

export default class childCallForceUpdateWithParentReturningFalseFromShouldComponentUpdate extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                name: "Mayank",
                age: 30
            }
        }
    }

    clickEventUpdate = () => {

        this.forceUpdate();
    }

    shouldComponentUpdate() {
        return true;
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

    shouldComponentUpdate() {
        return false;
    }

    clickEventUpdate = () => {
        this.props.userInfo.name = "Anshul Gupta";
        this.forceUpdate();
    }
    render() {
        return (
            <>
                <h1 style={{"color": "green"}}>Child Component:</h1>
                <h2>User Name from Parent: {this.props.userInfo.name}</h2>
                <h2>User Age from State: {this.state.age}</h2>
                <input type="button" value="Click to Update" onClick={this.clickEventUpdate} /><hr></hr>
            </>
        )
    }
} 