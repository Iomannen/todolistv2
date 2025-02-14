import React from 'react';

import logosvg from './rocket.svg';
import './logo.css';

class Logo extends React.Component {
  render() {
    return <img className="logo" src={logosvg}></img>;
  }
}

export default Logo;
