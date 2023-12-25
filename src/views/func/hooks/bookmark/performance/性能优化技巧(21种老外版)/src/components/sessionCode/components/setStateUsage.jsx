import React from "react";

export default class SetStateUsage extends React.Component  {
    constructor() {
        super();
        this.state = {
            counter: 1
        }
    }

    updateCounter = () => {
        debugger;
        this.setState({
            counter: this.state.counter + 1
        }, () => {
            this.setState({
                counter: this.state.counter + 1
            }, () => {
                this.setState({
                    counter: this.state.counter +  1
                })
            })
        })
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