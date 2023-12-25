import React from "react";

// The code here exposes the Chances of Cross Site Scripting Attacks.

function createMarkup() {
    return {__html: 'This is the Sample Input Text'};
}
  
export default function DangerouslySetInnerHTML() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
}   



var userWebsite = "javascript:alert('Hacked!');";

export class UserProfilePage extends React.Component {
  render() {
    return (
      <a href={userWebsite}>My Website</a>
    )
  }
}
