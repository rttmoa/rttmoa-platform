// In this we will sty to set the state without using "setState" and see if the element is updated or not

// Need to see if that is the valid scenerio to set state directly

// Can we then update the state using "forceUpdate"

import React from "react";

export default class UpdateStateIncorrectly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: 'Mayank'
            }
        }
    }

    changeUserData = () => {

        // Here we can see that the state can be changed directly, without using "setState"

        // But the problem is that the component will not be re-rendered.

        // To rerender, we need to call the "forceUpdate" function.

        this.state.user.name = "Anshul";

        setTimeout(() => {
            this.forceUpdate();
        }, 3000)
    }

    render() {
        return (
            <div>
                <h1>{this.state.user.name}</h1><br></br>
                <input type="button" onClick={this.changeUserData} value="Click To Change" />
            </div>
        )
    }
}