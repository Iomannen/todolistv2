import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

class Task extends React.Component {
  render() {
    const { callback, tasks } = this.props;
    return callback(tasks);
  }
}

Task.propTypes = {
  callback: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};
Task.defaultProps = {
  callback: () => console.log('Default callback'),
  tasks: [],
};
export default Task;
