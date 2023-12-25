import React from "react";

// The Thing that need to be observed is that since "shouldComponentUpdate()" is returning false

// The state variables of Parent Component will not update.. 

// The Child Component will be rerendered, but the props value will still remain the same..


class ChildComponent extends React.Component {

    constructor() {
        super();
        this.state= {
            age: 10
        }

        setTimeout(() => {
            this.setState({
                age: "20"
            })
        }, 1000);
    }

    render() {
        console.dir("Child Component Rendered");
        debugger;
        return <div>{this.props.name}</div>
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.dir("Should Component Update Called for Child Element");
        return true;
    }
}

export default class ChildUpdatesAlways extends React.Component {
    constructor() {
        super();

        this.state = {
            name: 'Mayank'
        }

        setTimeout(() => {
            this.setState({
                name: "Anshul"
            })
        }, 1000);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <ChildComponent name={this.state.name} />
    }
}