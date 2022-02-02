
//css or design
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//React
import React, { Component } from 'react';
import ViewPage from './ViewPage';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }

  componentDidMount = () => {
    /* const user = "" */
    fetch('/api/userCheck')
      .then(res => res.json())
      .then(user => this.setState({ user }))


  }


  render() {

    return (

      <ViewPage />

    );

  }

}

export default App;
