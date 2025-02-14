import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

class Input extends React.Component {
  render() {
    const { enterCallback } = this.props;
    return <input className="input" placeholder="Добавить новую задачу..." onKeyUp={enterCallback}></input>;
  }
}
Input.propTypes = {
  enterCallback: PropTypes.func.isRequired,
};
Input.defaultProps = {
  enterCallback: () => console.log('Enter pressed'),
};
export default Input;
