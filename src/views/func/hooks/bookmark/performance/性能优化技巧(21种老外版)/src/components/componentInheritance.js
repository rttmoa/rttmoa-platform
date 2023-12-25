import React from "react";

export default class ParentComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    showDetails = () => {
        alert(this.state.name);
    }

    render() {
        return (
            <div>
                Hello PArent
            </div>
        )
    }
}

export class ChildComponent extends ParentComponent {
    constructor() {
        super();

        this.state = {
            age: 10,
            name: "Anshul"
        }
    }
    render() {
        return (
            <div>
                {super.render()}
                <h1>This is New Child Data</h1>
                <input type="button" onClick={this.showDetails} value="Click To Call Parent Function" />
            </div>
        )
    }
}

