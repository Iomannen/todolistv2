import React from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends React.Component {
  render() {
    const { taskprop, deleteCallback } = this.props;

    return (
      <button
        className="delete_button"
        onClick={() => {
          deleteCallback(taskprop);
        }}
      ></button>
    );
  }
}

DeleteButton.propTypes = {
  taskprop: PropTypes.object.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

DeleteButton.defaultProps = {
  taskprop: {},
  deleteCallback: () => console.log('Button clicked!'),
};
export default DeleteButton;
