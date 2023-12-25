import React from 'react';

export default class PureComponent extends React.Component {

    // Pure Components are the components that do not re-render if the State data or props data is still the same   

    constructor() {
        super();
        this.state = {
            user: {
                firstName: "Gupta"
            }
        }
    }

    updateState = () => {

        // SetState always calls for the "render" function. PureComponents are not rerendered if props or state do not update

        // Even when we are updating the state, since its a complex object therefore, the changes are not propogated to the Child Elements.

        setInterval(() => {
            this.setState({
                user: {
                    firstName: "aaaaaa"
                }
            })
        }, 1000)
    }

    componentDidMount() {
        this.updateState();
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {

        console.log("Render Called Again")
        return (
            <div>
                <RegularChildComponent name={this.state.user.firstName} />
                <PureChildComponent name={this.state.user.firstName} />
            </div>
        )
    }
}

class RegularChildComponent extends React.Component {
    render() {
        console.log("Regular Component Rendered..");
        return <div>{this.props.name}</div>;
    }
}

class PureChildComponent extends React.PureComponent {
    render() {
        console.log("Pure Component Rendered..")
        return <div>{this.props.name}</div>;
    }
}