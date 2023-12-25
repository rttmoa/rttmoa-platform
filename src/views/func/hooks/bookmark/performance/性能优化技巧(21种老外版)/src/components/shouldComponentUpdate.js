import React from "react";

// foceUpdate updates the Component irrespective of whether the "shouldComponentUpdate" returns true or false

// This method "forceUpdate" wont go to "shouldComponent Update"

export default class ShouldComponentUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    componentWillMount() {
        this.setState({
            name: "Meha"
        });
        console.log("componentWillMount")
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({
                name: "Anshul"
            });
        }, 5000);
        
        console.log("componentDidMount")
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.dir("shouldComponentUpdate");
        return false;
    }

    consoleMessage = () => {
        console.log("Function Called");
        this.forceUpdate();
    }

    render() {
        console.dir("render");
        return (
            <div id="mainData">
                <p>{this.state.name}</p>
                <input type="button" value="Click" onClick={this.consoleMessage} />
            </div>
        )
    }
}