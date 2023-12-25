import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class RoutingConcepts extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
            
                    <h1>This is the Header Tab</h1>

                    <Link style={{paddingRight: "10px"}} to="/">Home</Link>
                    <Link style={{paddingRight: "10px"}} to="/about">About</Link>
                    <Link style={{paddingRight: "10px"}} to="/help">Help</Link><br></br>

                    <div style={{"paddingTop": "20px"}}>
                        <b>This is the Replacable Content below</b><hr></hr>

                        <Route exact path="/" component={() => <HomeComponent name={this.state.name} />}></Route>
                        <Route exact path="/about" component={AboutComponent}></Route>
                        <Route exact path="/help" component={HelpComponent}></Route>
                    </div>

                    <h2>This is the footer</h2>
                </div>
            </BrowserRouter>
        )
    }

}

class HomeComponent extends React.Component {
    render() {
        return (
            <div>This is the Home Component {this.props.name}</div>
        )
    }

    componentWillUnmount() {
        console.log("Component Unmounted");
    }
}

function AboutComponent() {
    return (
        <div>This is the About Component</div>
    )
}

function HelpComponent() {
    return (
        <div>This is the Help Component</div>
    )
}