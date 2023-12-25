import React from "react";

export default class RenderProps extends React.Component {
    render() {
        return(
            <>
                {this.props.renderdata}<br></br>
                <b>UserName: {this.props.name}</b><hr></hr>
                <div>The above Component is rendered Via Props</div>
            </>
        )
    }
}