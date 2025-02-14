import React from 'react';
import PropTypes from 'prop-types';

import Task from './task/task_components/Task';
import './taskList.css';
class TaskList extends React.Component {
  render() {
    const { callback, tasks } = this.props;
    return (
      <div className="tasklist">
        <Task callback={callback} tasks={tasks} />
      </div>
    );
  }
}
TaskList.propTypes = {
  callback: PropTypes.func.isRequired,
  tasks: PropTypes.array,
};

TaskList.defaultProps = {
  callback: () => console.log('Default callback'),
  tasks: [],
};
export default TaskList;
