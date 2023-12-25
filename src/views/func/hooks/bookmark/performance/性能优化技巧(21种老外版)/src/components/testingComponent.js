import React from 'react';
import "../styles/logoStyle.css";

export default class TestingComponent extends React.Component {
    render() {
        return (
            <div className="app_container">
                <img src="./images/logo.jpg" className="header_logo"/>
                <div className="salutation">Employee Lists</div>
                <UserName />
            </div>
        );
    }
}


function UserName() {
    return <h2>Mayank Gupta</h2>
}

