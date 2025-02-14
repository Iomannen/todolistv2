import React from 'react';

import Logo from '../component_modules/logo/Logo.jsx';
import Label from '../component_modules/label/Label.jsx';
import './mainlogo.css';

class MainLogotype extends React.Component {
  render() {
    return (
      <div className="mainlogo">
        <Logo />
        <Label />
      </div>
    );
  }
}

export default MainLogotype;
