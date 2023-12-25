import React from "react";

// One of the agenda for this topic could be that, we can show different ways to bind ecvents

// 1. Bind Data in the Constructor

// 2. Bind Data during Function call

// 3. Use Arrow Functions..

// There are advantages and disadvantages for each method, best is to do in the constructor;

export default class HandlingEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: this.props.counter
        }
        this.incrementCounterValue = this.incrementCounterValue.bind(this)
    }

    incrementCounterValueWithoutArrow() {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    incrementCounterValueWithValues = (strValue, event) => {
        console.log(strValue)
    }


    incrementCounterValue = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    incrementCounterValueWithEvents = (event) => {
        console.dir(event);
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <div>
                The Current Counter: {this.state.counter}<br/><br/>
                <input type="button" value="Click Me" onClick={this.incrementCounterValue.bind(this)} />
                <input type="button" value="Click Me" onClick={this.incrementCounterValue} />
                <input type="button" value="Click Me" onClick={(event) => this.incrementCounterValueWithEvents(event)} />
                <input type="button" value="Click Me For Data" onClick={(event) => this.incrementCounterValueWithValues(this.props.counter, event)} />
            </div>
        )
    }
}