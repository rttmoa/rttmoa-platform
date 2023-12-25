import React from "react";

export default class SimpleAsynchUpdate extends React.Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
    }

    updateCounter() {

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
            <div style={{"marginLeft": "10px"}}>
                <h1>Counter Value: {this.state.counter}</h1>
                <input type="button" onClick={this.updateCounter.bind(this)} value="Click" />
            </div>
        )
    }
    
}