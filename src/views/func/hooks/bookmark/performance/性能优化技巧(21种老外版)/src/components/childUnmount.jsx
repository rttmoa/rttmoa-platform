import React from 'react';


// Here is this program we can see that when the Parent/Top Component changes.. Then the Child Components are Unmounted and then Mounted again

// It says if the Top Element is different, then the Application should re-render the All the Child Components..

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
                    <OtherChildComponent name={this.state.name} />
                </div>
            )
        }
        
    }

    componentWillUnmount() {
        alert("Component Unmounted")
    }
        
}