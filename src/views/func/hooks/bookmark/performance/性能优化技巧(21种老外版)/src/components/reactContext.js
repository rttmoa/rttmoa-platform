import React from "react";
const FamilyContext = React.createContext({});
export const FamilyProvider = FamilyContext.Provider;
export const FamilyConsumer = FamilyContext.Consumer;

export default class GrandParents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surName: "Gupta"
        }
    }

    render() {
        return (
            <FamilyProvider value={this.state}>

                <div><b>Grand Parents Initial Surname: </b>{this.state.surName}</div><br/><br/>
                <Parents surName={this.state.surName} />
            </FamilyProvider>
        )
    }
}

function Parents(props) {
    return (
        <FamilyConsumer>
            {(context) => (
                <div>
                <b>Inherited Parent Property With "props": </b><label>{props.surName}</label><br/><br/><br/>
                <Children />
            </div>
            )}
            
        </FamilyConsumer>
    )
}

class Children extends React.Component {
    render() {
        return (
            <FamilyConsumer>
                {(context) => (
                    <div>
                        <b>Inherited Child Properties without "props": </b><label>{context.surName}</label>
                    </div>
                )}
            </FamilyConsumer>
            
        )
    }
}