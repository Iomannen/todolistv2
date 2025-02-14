import React from 'react';
import PropTypes from 'prop-types';

import './tasks_counter_module.css';

class TasksCounterModule extends React.Component {
  render() {
    const { content, counter } = this.props;
    return (
      <div className="tasksCounterModule">
        <div className="tasksText">{content}</div>
        <div className="tasksCount">{counter}</div>
      </div>
    );
  }
}

TasksCounterModule.propTypes = {
  content: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};
TasksCounterModule.defaultProps = {
  content: 'Counter',
  counter: 0,
};
export default TasksCounterModule;
