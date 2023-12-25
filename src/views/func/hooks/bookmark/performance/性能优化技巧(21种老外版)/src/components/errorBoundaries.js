import React from 'react';

export class ErrorBoundaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false
        }
    }

    componentDidCatch(error, info) {
        console.dir("Component Did Catch Error");
    }

    static getDerivedStateFromError(error) {

        // Get Derived State From Props Function captures the error and update the state accordingly..
        
        console.dir("Get Derived State From Error");
        return {
            hasErrors: true
        }
    }

    render() {

        if(this.state.hasErrors === true) {
            return <div>This is a Error</div>
        }

        return <div><ShowData name="Mayank" /></div>
    }
}

export class ShowData extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    changeData = () => {
       this.setState({
           name: "Anshul"
       })
    }
    render() {

        if(this.state.name === "Anshul") {
            throw new Error("Sample Error")
        }

        return (
            <div>
                <b>This is the Child Component {this.state.name}</b>
                <input type="button" onClick={this.changeData} value="Click To Throw Error" />
            </div>
        )
    }
}