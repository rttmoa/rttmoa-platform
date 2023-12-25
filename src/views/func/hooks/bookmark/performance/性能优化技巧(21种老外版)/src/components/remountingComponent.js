import React from 'react';

// Here we need to consider the following.. 

// Whenever the parent root component changes.. the child component are unmounted and remounted..

// Since the children are getting unmounted, their unmount event will be called..

class RecreateClass extends React.Component {
    render() {
        return <div>This is Apache nginx Testing..</div>
    }

    componentWillUnmount() {
        alert("Component Is Unmounted")
    }
}

class RecreateOtherClass extends React.Component {
    render() {
        return <div>This is Apache nginx Testing..</div>
    }

    componentWillUnmount() {
        alert("Component Is Unmounted")
    }
}

export default class RemountingComponent extends React.Component {
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
        }, 4000)
        
    }

    render() {

        if(this.state.name === "Mayank") {
            return (
                <div><RecreateClass /></div>
            )
        } else {
            return (
                <p><RecreateClass /></p>
            )
        }
        
    }

    componentWillUnmount() {
        alert("Parent Component Is Unmounted")
    }
        
}


