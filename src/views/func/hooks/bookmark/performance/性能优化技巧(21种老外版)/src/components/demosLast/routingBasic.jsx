import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class RoutingBasic extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Mayank"
        }
    }

    render() {
        return (
            <BrowserRouter>

                <>

                    <h1>This is the Application Header</h1>

                    <Link style={{"marginRight": "15px"}} to="/">Home</Link>
                    <Link style={{"marginRight": "15px"}} to="/about">About</Link>
                    <Link style={{"marginRight": "15px"}} to="/help">Help</Link>

                    <div>
                        <Route exact path="/help" render={() => <Help></Help>}></Route>
                        <Route exact path="/about" render={About}></Route>
                        <Route exact path="/" render={Home}></Route>
                    </div>

                    <div>
                        <Route exact path="/help" component={Help}></Route>
                        <Route exact path="/about" component={About}></Route>
                        <Route exact path="/" component={Home}></Route>
                    </div>

                    <h2>This is the footer of the Application</h2>

                    <Route exact path="/" component={Home}></Route>

                </>

            
            </BrowserRouter>
        )
    }
}

function Home() {
        return (
            <div>
                This is Home Page
            </div>
        )
}

function About() {
    return <h1>About Page</h1>
}

function Help() {
    return <h1>Help Page</h1>
}