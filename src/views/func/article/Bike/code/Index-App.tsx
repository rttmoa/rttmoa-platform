import React from 'react';

const App = 
`import React, { Component } from 'react';
import './App.css';
 
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;`

export default App;
