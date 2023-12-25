import React from 'react';


export default class ComponentWillReceiveProps extends React.Component {
    constructor() {
        super();
        this.state= {
            name: "Mayank"
        }

        setTimeout(()=> {
            this.setState({
                name: "New Name"
            })
        }, 4000)
    }

    render() {
        return <ChildComponent name={this.state.name} />;
    }
}

class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    // This is the Event where the component before re-rendering, can update state from new props values

    componentWillReceiveProps(props, state) {
        this.setState({
            name: props.name
        })
    }

    render() {
        return (
            <div>
                <h2>User State Name is: {this.state.name}</h2>
                <h3>User Props name is: {this.props.name}</h3>
            </div>
        )
    }
}


