import React from 'react';


// Child component unmounts if the child component is no longer rendered by the parent

// http://buildwithreact.com/article/component-lifecycle

class ChildComponent extends React.Component {
    render() {
        if(this.props.name === "Mayank") {
            return (
                <div>This is First Component: {this.props.name}</div>
            )
        } else {
            return (
                <div>This is the Second Component: {this.props.name}</div>
            )
        }
    }

    componentWillUnmount() {
        alert("Child Component Unmounted")
    }
}


class OtherChildComponent extends React.Component {
    render() {
        if(this.props.name === "Mayank") {
            return (
                <div>This is First Component: {this.props.name}</div>
            )
        } else {
            return (
                <div>This is the Second Component: {this.props.name}</div>
            )
        }
    }

    componentWillUnmount() {
        alert("Other Child Component Unmounted")
    }
}


export default class CallingChildUnmount extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({
                name: "Anshul"
            })
        }, 3000)
        
    }

    render() {

        // The Hierarchy of the parent has changed, which forces all the children below to re-render

        if(this.state.name === "Mayank") {
            return (
                <div>
                    <ChildComponent name={this.state.name} />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Hello World...</h1>
                </div>
            )
        }
        
    }

    componentWillUnmount() {
        alert("Component Unmounted")
    }
        
}