import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

export default class ExtractingParameters extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>This is the Header</h1>
                        <nav style={{paddingBottom: "20px"}}>
                            <Link style={{paddingRight: "10px"}} to="/">Home</Link>
                            <Link style={{paddingRight: "10px"}} to="/about/Mayank/10/demo">About</Link>
                            <Link style={{paddingRight: "10px"}} to="/help">Help</Link>
                        </nav>
                    </header>

                    <b style={{marginBottom: "10px"}}>The Area below will be Updated</b><br/><br/>
                    <Switch>
                        <Route exact path="/" component={HomeComponent}></Route>
                        <Route exact path="/about/:name/:userid/:lastparam" component={AboutComponent}></Route>
                        <Route exact path="/help" component={HelpComponent}></Route>
                    </Switch>

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

function AboutComponent(props) {
    console.dir(props)
    return (
        <>
            <h1>User Name {props.match.params.name}</h1>
            <h2>User Age {props.match.params.userid}</h2>
            <h2>User Param {props.match.params.lastparam}</h2>
            <Route exact path="/about/:name/:userid/:lastparam" component={NestedComponent}></Route>
        </>
    )
}

function HelpComponent() {
    return (
        <div>This is the Help Component</div>
    )
}

function NestedComponent() {
    return (
        <div>This is the Nested Component</div>
    )
}