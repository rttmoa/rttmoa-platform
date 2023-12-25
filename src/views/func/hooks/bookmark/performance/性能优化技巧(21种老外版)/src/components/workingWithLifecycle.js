import React from 'react';

export default class LifeCycleEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "mayank"
        }


        setTimeout(() => {
            this.setState({
                name: "Abc"
            })
        }, 5000);
    }

    componentDidMount() {
        alert("Component Mounted")
    }

    componentWillMount() {
        alert("Component Will Mounted")
    }

    componentWillUnmount() {
        alert("Component Will Unmount");
    }

    componentWillUpdate() {
        alert("Updation in Progress")
        return true;
    }


    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate() {
        alert("Updated")
    }

    render() {
        return (
            <div>Hello World {this.state.name}</div>
        )
    }
}