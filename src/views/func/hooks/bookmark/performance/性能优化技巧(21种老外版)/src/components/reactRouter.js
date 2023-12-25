import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class LayoutPage extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>This is the Header</h1>
                        <nav style={{paddingBottom: "20px"}}>
                            <Link style={{paddingRight: "10px"}} to="/">Home</Link>
                            <Link style={{paddingRight: "10px"}} to="/about">About</Link>
                            <Link style={{paddingRight: "10px"}} to="/help">Help</Link>
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