// npm install prop-types

import React from "react";
import PropTypes from "prop-types";

export default class WorkingWithTypes extends React.Component {
    render() {
        return (
            <>
                <h1>User Name: {this.props.name}</h1>
                <h1>User Age: {this.props.age}</h1>
            </>
        )
    }
}

WorkingWithTypes.propTypes = {
    name: PropTypes.number,
    age: PropTypes.boolean
}

// Proptypes do show just the warnings..