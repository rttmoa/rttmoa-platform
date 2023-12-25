import React from "react";
import { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

export default class EmployeeDetails extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <div>This is header Component</div>
                        <nav>
                            <Link style={{paddingRight: "10px"}} to="/">Home</Link>
                            <Link style={{paddingRight: "10px"}} to="/about/5">About</Link>
                            <Link style={{paddingRight: "10px"}} to="/about">About</Link>
                            <Link style={{paddingRight: "10px"}} to="/help">Help</Link>
                        </nav>
                    </header><br/><br/>

                    <div>
                        <b>This is the replacable Content Area</b><br/><br/>

                        <div>
                            <Switch>
                                <Route path="/about/:id" component={About} />
                                <Route path="/help" component={Help} />
                                <Route path="/about" component={About} />
                                <Route path="/" component={Home} />
                            </Switch>
                        </div>
                    </div>
                    
                </div>
            </BrowserRouter>
        );
    }
}

function Home() {
    return <div>Home Page</div>
}

class About extends React.Component {

    constructor(props) {
        super(props);

        console.dir(this.props);
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <b>Navigate Back</b>
                <input type="button" value="Previous" onClick={this.goBack} />
            </div>)
    }
}

function Help() {
    return <div>Help Page</div>
}