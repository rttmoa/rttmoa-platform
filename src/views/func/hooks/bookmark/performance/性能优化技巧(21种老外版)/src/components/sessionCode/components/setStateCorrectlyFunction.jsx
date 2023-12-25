import React from "react";

export default class SetStateCorrectlyFunction extends React.Component  {
    constructor() {
        super();
        this.state = {
            counter: 1
        }
    }

    updateCounter = () => {

        this.setState((state, props) => {
            return {
                counter: state.counter + 1
            }
        });

        this.setState((state) => {
            return {
                counter: state.counter + 1
            }
        });

        this.setState((state) => {
            return {
                counter: state.counter + 1
            }
        });

        this.setState((state) => {
            return {
                counter: state.counter + 1
            }
        });

    }

    render() {
        return (
            <div>
                <b>Counter Value: {this.state.counter}</b><br></br>
                <input type="button" value="Increment Counter" onClick={this.updateCounter} />
            </div>
        )
    }
}