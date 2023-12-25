import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import React, { Component } from 'react';

// Validation Library: https://www.npmjs.com/package/react-validation

export default class WorkingWithForms extends Component {

    required = (value) => {
        if (!value.toString().trim().length) {
          return <b style={{"marginLeft": "20px"}}>Please Enter Name</b>;
        }
    };
      
    userName = (value) => {
        if(value === "Mayank Gupta") {
            return "Name is not Allowed..";
        }
    }
      
    render() {
        return (
            <Form>
                <Input value='email@email.com' name='email' validations={[this.required, this.userName]}/>
                <Input type='password' name='password' validations={[this.required]}/>
                <Button>Submit</Button>
            </Form>
        );
    }
}