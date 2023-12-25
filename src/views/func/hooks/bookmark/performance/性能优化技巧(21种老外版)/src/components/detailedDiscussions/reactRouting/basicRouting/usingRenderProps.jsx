import React from "react";
import { Route, BrowserRouter, Link} from "react-router-dom";

// The Route over here can intercept to get the "props" data for the request..


export default class UsingRenderProps extends React.Component {
    render() {
        return (
        <BrowserRouter>
            <div>
                <Link style={{"marginRight": "10px"}} to="/">Home</Link>
                <Link style={{"marginRight": "10px"}} to="/about">About</Link>
                <Link style={{"marginRight": "10px"}} to="/help">Help</Link><hr></hr>

                <div>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/about" component={AboutComponent} />
                    <Route exact path="/help" render={(props) => <HelpComponent name="Mayank" />} />
                </div>
            </div>
        </BrowserRouter>
        )
    }
}

function HomeComponent(props) {
    console.log(props)
    return (
        <div>This is the Home Component</div>
    )
}

function AboutComponent(props) {
    console.log(props)
    return (
        <div>This is the About Component</div>
    )
}

function HelpComponent(props) {
    console.log(props)
    return (
        <div>This is the Help Component</div>
    )
}

