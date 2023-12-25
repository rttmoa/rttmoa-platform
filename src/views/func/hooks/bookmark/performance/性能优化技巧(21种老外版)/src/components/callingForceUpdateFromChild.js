import React from "react";

// Here we need to see if "forceUpdate" updates the parent component also or not.

// As per the analysis, we can see that the parent component is not updated when the user "forceUpdate" the component.

// For the parent "forceUpdate" need to be called explicitely..

class ChildComponent extends React.Component {

    updateTheChild = () => {
        this.props.userInfo.name = "Anshul";
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h2>{this.props.userInfo.name}</h2><br></br>
                <input type="button" onClick={this.updateTheChild} value="Update Child" />
            </div>
        )
    }
}

export default class callingForceUpdateFromChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: 'Mayank'
            }
        }
    } 

    updateTheParent = () => {
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <ChildComponent userInfo={this.state.userInfo} />

                <input type="button" onClick={this.updateTheParent} value="Update Parent" />

                <h2>{this.state.userInfo.name}</h2>

            </div>
        )
    }
}