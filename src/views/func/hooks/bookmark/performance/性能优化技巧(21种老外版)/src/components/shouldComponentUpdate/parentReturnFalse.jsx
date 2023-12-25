/*

    Scenerio, where the parent "shouldComponentUpdate" return False and changes are made to the state of Parent Variable 
    This State from Parent is passed to the Child Elements.

    See if the Child update along with the state update of the Parent Element

    Observation:

    If the parent return "false" from "shouldComponentUpdate", Child Components are not Rerendered.
    None of the Update function is Called from the parent..

    Nore: When the value of "shouldComponentUpdate" is false, in that case the updated props are not updated with the children Components..

*/

import React from "react";

export default class ParentReturnFalse extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 30
        }
    }

    clickEventUpdate = () => {
        this.setState({
            name: "Anshul"
        })
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div>
                <h1 style={{"color": "red"}}>Parent Component Values:</h1>
                <h2>User Name: {this.state.name}</h2>
                <input type="button" value="Click to Update" onClick={this.clickEventUpdate} /><hr></hr>
                <ChildReturnTrue name={this.state.name}></ChildReturnTrue>
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

        setTimeout(() => {
            this.setState({
                age: 100
            })
        }, 4000);
    }

    render() {
        return (
            <>
                <h1 style={{"color": "green"}}>Child Component:</h1>
                <h2>User Name from Parent: {this.props.name}</h2>
                <h2>User Age from State: {this.state.age}</h2>
            </>
        )
    }
} 