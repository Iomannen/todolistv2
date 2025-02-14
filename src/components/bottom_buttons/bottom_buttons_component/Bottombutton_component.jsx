import React from 'react';
import PropTypes from 'prop-types';
import './bottombuttons.css';
class BottomButton extends React.Component {
  render() {
    const { content, callback, classname } = this.props;
    return (
      <button className={classname} onClick={callback}>
        {content}
      </button>
    );
  }
}

BottomButton.propTypes = {
  content: PropTypes.string.isRequired,
  callback: PropTypes.func,
  classname: PropTypes.string,
};

BottomButton.defaultProps = {
  content: 'Button',
  callback: () => console.log('Button clicked'),
  classname: 'default-button',
};
export default BottomButton;
