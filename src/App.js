import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import GameCaro from './containers/GameCaro/GameCaro';

import './App.css';

class App extends Component {
  hello = () => {

  }

  render() {
    return (
      <Layout>
        <GameCaro />
      </Layout>
    )
  }
}

export default App;
