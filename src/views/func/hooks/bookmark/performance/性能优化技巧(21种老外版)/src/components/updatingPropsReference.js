// Over here its import to realize that althoug the props are non mutable, but if the input data is Object Lteral.

// The component can change the property values of Complex Objects, but should not reassign them

// This also make the component impure function which should be avaided since it is trying to change input paramaters.

// Here name and age can be reassigned but user cannot be reassigned inside the child component bcoz thats the property which is passed as props

// Also the changes in props are available to the child component itself, it do not mutates the sparent state data..

import React from "react";

var user = {
    name: 'Mayank',
    age: 40
}

class OtherDetails extends React.Component {
    constructor(props) {
        super(props);

        // Here the props value passed in an Object reference, so it is not deep copied 

        // Any change done to the value will effect the state variable also

        // The parent component will not update since the "props" didnt change and there was no call to "setState"

        this.props.user.name = "Anshul"
        this.props.user.age = 30;

        console.log(user.name)
    }

    render() {
        return <h2>Other Info: {this.props.user.name}  {this.props.user.age}</h2>
    }
}

export default class UpdatingPropsReference extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: user
        }

        console.log(this.state.user == user)

        this.state = {
            user: user
        }

        console.log(this.state.user == user)
    }

    getUserName = () => {

        // Since the state "user" variable refers to an object reference, when the Object Changes, it mutates the State variable also

        // In order to replicate the change on the UI, we need to force the UI to Update here..

        // We can use forceUpdate to update the stte of the Component.

        user.name = "Some Other Name";
        console.log(this.state.user.name)
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>User Name is: {this.state.user.name}  {this.state.user.age}</h1>
                <OtherDetails user={this.state.user} />
                <h1>User Name is: {this.state.user.name}  {this.state.user.age}</h1>
                <button onClick={this.getUserName}>Click For Name</button>
            </div>
        )
    }

}

