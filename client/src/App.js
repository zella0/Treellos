import React, { Component } from 'react';

import { connect } from 'react-redux';

import Dashboard from './components/Dashboard';

class App extends Component {
  componentDidMount(){

  }

  render() {
    return (
      <React.Fragment>
        <Dashboard/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
