import React from "react";

export default class SimpleClassComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            timer: new Date().toLocaleTimeString(),
            dataArr: null
        }

        setInterval(function() {
            debugger;
            this.setState({
                timer: new Date().toLocaleTimeString()
            })
        }.bind(this), 1000)
    }

    render() {

        console.log(this.state.dataArr)
        return (
            <div>
                <b>Current Time: {this.state.timer}</b>
            </div>
        )
    }
}