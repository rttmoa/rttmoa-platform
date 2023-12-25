import React from 'react';
import PropTypes from 'prop-types';

export default class WorkingWithProps extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: "Mayank",
            userAge: true,
            userDesignation: "Developer"
        }
    }

    render() {
        return (
            <User {...this.state}></User>
        )
    }
}

class User extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.userName}</div>
                <div>{this.props.userAge}</div>
                <div>{this.props.userDesignation}</div>
            </div>
        )
    }
}

User.propTypes = {
    userName: PropTypes.string,
    userDesignation: PropTypes.string,
    userAge: PropTypes.number
}