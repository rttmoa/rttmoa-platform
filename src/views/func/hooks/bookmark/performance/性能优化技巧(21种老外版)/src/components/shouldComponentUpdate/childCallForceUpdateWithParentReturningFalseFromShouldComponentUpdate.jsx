/*

    Scenerio, where the parent "shouldComponentUpdate" return False and changes are made to the state of Parent Variable 
    This State from Parent is passed to the Child Elements. State on the parent Updates.
    See if the parent and Child states are both Updated on the change of parent State
    Also see if the "shouldComponentUpdate" is called on the Child Element.
    Here what we are doing is to return false in the Child Component from "shouldComponentUpdate" function
    See if the child component still updates the value passed from the Parent Component and Also the State variable that it changed for self

    Observation:

    In case when the parent Component is returning false from "shouldComponentUpdate", then the child component is rerendered normally
    The "shouldComponentUpdate" of the child is called for the same and there is normal updation of the Child.
    Along with the update to the Parent Component..

    If the Child also returns false from the "shouldComponent", then forceUpdate from parent will not effect the Child Component..

    In this case the parent will be updated, but not the child element.

    ** The crux of the same is that the Child Component is called normally even if the Parent Component is called as "forceUpdate"

    The "shouldComponentUpdate" will execute on the Child Component also. and the returned value decides whether the component will rerender or not.

*/

import React from "react";

export default class ChildCallForceUpdateWithParentReturningFalseFromShouldComponentUpdate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank",
            age: 30
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log("Parent");
        console.dir(props);
        console.dir(state);
    }

    clickEventUpdate = () => {
        debugger;
        this.setState({
            name: "Anshul"
        });

        this.forceUpdate();
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

    static getDerivedStateFromProps(props, state) {
        console.log("Child");
        console.dir(props);
        console.dir(state);
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

    clickEventUpdateFromChild = () => {
        alert(this.props.name);
        this.forceUpdate();
    }

    shouldComponentUpdate() {
        console.log("Should Component Update called for the Child Even for the Force Update..")
        return false;
    }

    render() {
        return (
            <>
                <h1 style={{"color": "green"}}>Child Component:</h1>
                <h2>User Name from Parent: {this.props.name}</h2>
                <h2>User Age from State: {this.state.age}</h2>
                <input type="button" value="Click to Update" onClick={this.clickEventUpdateFromChild} /><hr></hr>
            </>
        )
    }
} 