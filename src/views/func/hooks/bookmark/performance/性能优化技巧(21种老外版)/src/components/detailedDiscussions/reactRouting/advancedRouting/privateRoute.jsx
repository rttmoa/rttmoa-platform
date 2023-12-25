import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class PrivateRoute extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }

    toggleLogIn = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        })
    }
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
                    <SecureRoute isLoggedIn={this.state.isLoggedIn} exact path="/" component={HomeComponent}></SecureRoute>
                    <SecureRoute isLoggedIn={this.state.isLoggedIn} exact path="/about" component={AboutComponent}></SecureRoute>
                    <SecureRoute isLoggedIn={this.state.isLoggedIn} path="/help/:id" component={HelpComponent}></SecureRoute><br></br>
                    <input type="button" value={this.state.isLoggedIn? "Log Out": "Log In"} onClick={this.toggleLogIn} />
                    
                </div>
            </BrowserRouter>
        )
    }
}

class SecureRoute extends React.Component {
    render() {
        var {component: ComponentToRender, ...otherProps} = this.props;
        return (
            <Route {...otherProps} render={(props) => {
                if(this.props.isLoggedIn) {
                    return <ComponentToRender {...props}></ComponentToRender>
                }
                return <PageNotFound></PageNotFound>
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

function PageNotFound(props) {
    console.dir(props)
    return (
        <div>Please Login to Proceed...</div>
    )
}