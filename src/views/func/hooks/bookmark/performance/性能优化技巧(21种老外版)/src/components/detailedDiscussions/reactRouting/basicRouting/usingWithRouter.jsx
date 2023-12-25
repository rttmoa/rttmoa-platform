import React from "react";
import { Route, BrowserRouter, Link, withRouter} from "react-router-dom";


export default class UsingWithRouter extends React.Component {
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
                    <Route exact path="/help" render={() => <HelpComponent name="Mayank" />} />
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

function HelpComponentWithoutData(props) {
    console.log(props)
    return (
        <div>This is the Help Component</div>
    )
}

var HelpComponent = withRouter(HelpComponentWithoutData)

