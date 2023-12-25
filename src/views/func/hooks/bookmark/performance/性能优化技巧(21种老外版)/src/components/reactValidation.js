import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import React, { Component } from 'react';

// Validation Library: https://www.npmjs.com/package/react-validation


const required = (value) => {
  if (!value.toString().trim().length) {
    return 'require';
  }
};

const userName = (value) => {
    if(value === "Mayank Gupta") {
        return "Name is not Allowed..";
    }
}




export default class ReactValidation extends Component {
    render() {
        return (
            <Form>
                <h3>Login</h3>
                <div>
                    <label>
                        Email*
                        <Input value='email@email.com' name='email' validations={[required, userName]}/>
                    </label>
                </div>
                <div>
                    <label>
                        Password*
                        <Input type='password' name='password' validations={[required]}/>
                    </label>
                </div>
                <div>
                    <Button>Submit</Button>
                </div>
            </Form>
        );
    }
}