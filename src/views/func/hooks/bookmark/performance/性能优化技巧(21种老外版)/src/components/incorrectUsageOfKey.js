// Key is used to uniquely Identify the Element in the Iteration.. If the key is not placed.. React uses "index" as default

// If key is not used or key is used as index.. in that case all the Uncontrolled element may behave in the unexpected way..

// In case the key are same.. Only State and Props values are updated.. Since the uncontrolled elements are not managed by either, therefore it behaves inconsistently.


import React from 'react';

export default class IncorrectUsageOfKey extends React.Component {
    constructor() {
        super();
        this.state = {
            userNameList: ["Mayank", "Meha", "Anshul"],
            newUser: ""
        }
    }

    addUser = () => {
        this.setState({
            userNameList: [this.state.newUser, ...this.state.userNameList],
            newUser: ""
        })
    }

    getNewUserData = (event) => {
        this.setState({
            newUser: event.target.value
        })
    }

    render() {
        return (
            <>
                { 
                    this.state.userNameList.map((employee, index) => {
                        return (<div style={{color: 'red', padding: '10px', margin: '10px', borderBottom: '1px solid black'}}>
                            <b style={{paddingRight: '5px'}}>User Name: {employee}, User Index: {index}</b>
                            <input type="text" placeholder="Enter User Description" />
                        </div>)
                    })
                }

                <input type="text" value={this.state.newUser} onChange={(event) => this.getNewUserData(event)} />
                <input type="button" value="Click To Add User" onClick={this.addUser} />
            </>
        )
    }
}