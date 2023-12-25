/*

We would like to see if multiple setState is called, whether they will be reflected or not
If multiple setState is called without the function, then it is incorrect.
If the react setState is called with the function and multiple times called
They are stacked together after each other.
SetState execute them synchronously..

*/

import React from "react";

export default class AsynchUpdates extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 1
        }
    }

    incorrectEventUpdate = () => {
        this.setState({
            counter: this.state.counter + 1
        })

        this.setState({
            counter: this.state.counter + 1
        })
    }

    correctEventUpdate = () => {
        this.setState({
            counter: this.state.counter + 1
        }, () => {
            this.setState({
                counter: this.state.counter + 1
            })
        });
    }

    otherCorrectEventUpdate = () => {
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
                <h2>User Counter: {this.state.counter}</h2>
                <input type="button" value="Incorrect Way To Update..." onClick={this.incorrectEventUpdate} /><br></br><br></br>
                <input type="button" value="Correct Way To Update..." onClick={this.correctEventUpdate} /><br></br><br></br>
                <input type="button" value="OtherCorrect Way To Update..." onClick={this.otherCorrectEventUpdate} />
            </div>
        )
    }
}