import React from 'react';
import PropTypes from 'prop-types';

import Input from './input_components/input/Input.jsx';
import Button from './input_components/button/Button.jsx';
import './inputBlock.css';
class InputBlock extends React.Component {
  render() {
    const { callback, enterCallback } = this.props;
    return (
      <div className="taskAdditionBlock">
        <Input enterCallback={enterCallback} />
        <Button callback={callback} />
      </div>
    );
  }
}
InputBlock.propTypes = {
  callback: PropTypes.func.isRequired,
  enterCallback: PropTypes.func.isRequired,
};

InputBlock.defaultProps = {
  callback: () => console.log('Button clicked'),
  enterCallback: () => console.log('Enter pressed'),
};
export default InputBlock;
