import React, { useState } from "react";

export default function EmployeeDetails()  {

    const [name] = useState("Mayank");
    const [age, setAge] = useState(31);
    const [designation] = useState("Senior Developer");
    
    function updateEmployeeAge() {
      setAge(age + 1);
    }
    
    return (
      <div>
        <p>Employee Name: {name}</p>
        <p>Employee Age: {age}</p>
        <p>Employee Designation: {designation}</p>
        <input type="button" onClick={updateEmployeeAge} value="Click To Update Age" />
      </div>
    )
}
