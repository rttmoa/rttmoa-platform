
import React from "react";

export default class NestedRoutingComponent extends React.Component {
    render() {
        return (

            // bad
            // <h1>This is the Header Component</h1>
            // <h2>Welcome To Demo Page</h2>


            // good
            // <div>
            //     <h1>This is the Header Component</h1>
            //     <h2>Welcome To Demo Page</h2>
            // </div>
            
            
            // better
            <>
                <h1>This is the Header Component</h1>
                <h2>Welcome To Demo Page</h2>
            </>
        )
    }
}

