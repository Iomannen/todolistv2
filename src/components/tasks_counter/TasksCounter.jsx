import React from 'react';
import PropTypes from 'prop-types';

import TasksCounterModule from './tasks_counter_module/TasksCounterModule';
import './tasks_counter.css';

class TasksCounter extends React.Component {
  render() {
    const { counter, secondCounter } = this.props;
    return (
      <div className="tasksCounter">
        <TasksCounterModule
          content={'Все задачи'}
          counter={counter} // ну тут просто я счетчик ставлю равным
        />
        <TasksCounterModule
          content={'Завершено'}
          counter={`${secondCounter} из ${counter}`} //  этой функцией я перебираю задачи в локалсторедже, те которые false те не выполнены
        />
      </div>
    );
  }
}

TasksCounter.propTypes = {
  counter: PropTypes.number.isRequired,
  secondCounter: PropTypes.number.isRequired,
};
TasksCounter.defaultProps = {
  counter: 0,
  secondCounter: 0,
};

export default TasksCounter;
