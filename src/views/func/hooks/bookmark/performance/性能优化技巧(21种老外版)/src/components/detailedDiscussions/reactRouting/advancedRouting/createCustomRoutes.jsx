import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class CreateCustomRoutes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>This is the Header</h1>
                        <nav style={{paddingBottom: "20px"}}>
                            <Link style={{paddingRight: "10px"}} to="/">Home</Link>
                            <Link style={{paddingRight: "10px"}} to="/about">About</Link>
                            <Link style={{paddingRight: "10px"}} to="/help/12">Help</Link>
                        </nav>
                    </header>

                    <b style={{marginBottom: "10px"}}>The Area below will be Updated</b><br/><br/>
                    <CustomRouter exact path="/" component={HomeComponent}></CustomRouter>
                    <CustomRouter exact path="/about" component={AboutComponent}></CustomRouter>
                    <CustomRouter path="/help/:id" component={HelpComponent}></CustomRouter>
                </div>
            </BrowserRouter>
        )
    }
}

class CustomRouter extends React.Component {
    render() {
        var {component: ComponentToRender, ...otherProps} = this.props;
        return (
            <Route {...otherProps} render={(props) => {
                return <ComponentToRender {...props}></ComponentToRender>
            }}></Route>
        )
    }
}


function HomeComponent(props) {
    return (
        <div>This is the Home Component</div>
    )
}

function AboutComponent() {
    return (
        <div>This is the About Component</div>
    )
}

function HelpComponent(props) {
    console.dir(props)
    return (
        <div>This is the Help Component</div>
    )
}