import React from 'react';
class Timecounter extends React.Component {
    constructor(){
        super();
        this.state = {
            "currentTime" : new Date().toLocaleTimeString()
        } 
        this.updateClock = this.updateClock.bind(this);
    }

    updateClock() {
        this.setState({
            "currentTime" : new Date().toLocaleTimeString()
        });
    }
    
    render(){
        return (<div>
            <Clock currentTime={this.state.currentTime}/><br/><br/>
            <input type="button" value="Click to Update Time" onClick={this.updateClock}></input>
        </div>)
    }
}

function Clock(props) {
    return <div><b>Current Time: {props.currentTime}</b></div>
}

export default Timecounter