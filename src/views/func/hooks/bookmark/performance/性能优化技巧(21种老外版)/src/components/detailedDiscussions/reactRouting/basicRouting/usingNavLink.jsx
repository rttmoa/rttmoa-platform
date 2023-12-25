import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

export default class UsingNavLink extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>This is the Header</h1>
                        <nav style={{paddingBottom: "20px"}}>
                            <NavLink exact activeClassName="highlightSelectedLink" style={{paddingRight: "10px"}} to="/">Home</NavLink>
                            <NavLink activeClassName="highlightSelectedLink" style={{paddingRight: "10px"}} to="/about">About</NavLink>
                            <NavLink activeClassName="highlightSelectedLink" style={{paddingRight: "10px"}} to="/help">Help</NavLink>
                        </nav>
                    </header>

                    <b style={{marginBottom: "10px;"}}>The Area below will be Updated</b><br/><br/>

                    <Route exact path="/" component={HomeComponent}></Route>
                    <Route exact path="/about" component={AboutComponent}></Route>
                    <Route exact path="/help" component={HelpComponent}></Route>

                </div>
            </BrowserRouter>
        )
    }
}


function HomeComponent() {
    return (
        <div>This is the Home Component</div>
    )
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