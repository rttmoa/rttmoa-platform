import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class CreateCustomLink extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>This is the Header</h1>
                        <nav style={{paddingBottom: "20px"}}>
                            <WrapperLink style={{paddingRight: "10px"}} to="/">Home</WrapperLink>
                            <WrapperLink style={{paddingRight: "10px"}} to="/about">About</WrapperLink>
                            <Link style={{paddingRight: "10px"}} to="/help/data/121323?name=Mayank">Help</Link>
                        </nav>
                    </header>

                    <b style={{marginBottom: "10px"}}>The Area below will be Updated</b><br/><br/>
                    <Route exact path="/" component={HomeComponent}></Route>
                    <Route exact path="/about" component={AboutComponent}></Route>
                    <Route path="/help" component={HelpComponent}></Route>
                </div>
            </BrowserRouter>
        )
    }
}


function HomeComponent(props) {
    console.dir(props)
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
    return (
        <div>This is the Help Component</div>
    )
}

function WrapperLink(props) {

    // A new Wrapper link is created so that the user can do custom stuff with the link click

    // We can even use classes so that the lifecycle event can also be captured..
    
    function handleClick() {
        console.log("Link Changed...");
    }

    console.dir(props)

    return <Link onClick={handleClick} {...props}>{props.children}</Link>
}