import React from 'react';
import { formatDistance, subSeconds } from 'date-fns';
import { ru } from 'date-fns/locale';

import '../App.css';

import MainLogotype from '../components/mainlogo/MainLogotype.jsx';
import InputBlock from '../components/input/InputBlock.jsx';
import BottomButtons from '../components/bottom_buttons/BottomButtons_block.jsx';
import TasksCounter from '../components/tasks_counter/TasksCounter.jsx';
import TaskList from '../components/tasklist/TaskList.jsx';

import DeleteButton from './tasklist/task/task_components/DeleteButton.jsx';

class NewFile extends React.Component {
  completetasks = [];
  inprocesstasks = [];
  tasks = [];
  state = {
    hover: 0,
    stateChange: 0,
    renderTasks: this.tasks,
    counter: 0,
    completeCounter: this.completetasks.length,
  };
  componentDidMount = () => {
    this.setState({ render: this.state.renderTasks.length });
    const keys = Object.keys(localStorage);
    for (let key of keys) {
      const task = JSON.parse(key);
      if (localStorage.getItem(key) === 'true') {
        this.tasks.push(task);
        this.inprocesstasks.push(task);
      }
    }
    for (let key of keys) {
      const task = JSON.parse(key);
      if (localStorage.getItem(key) === 'false') {
        task.complete = true;
        this.tasks.push(task);
        this.completetasks.push(task);
      }
    }

    console.log(this.tasks);
    this.setState({
      counter: this.tasks.length,
      completeCounter: this.completetasks.length,
    });
  };
  renderList = (tasks) => {
    tasks.sort((a, b) => {
      if (a.complete !== b.complete) {
        return String(a.complete).localeCompare(String(b.complete)); // "pending" раньше "completed"
      }
      // Если статусы одинаковые, сортируем по второму полю (priority)
      return b.timestamp - a.timestamp;
    });
    return tasks.map((task, index) => (
      <div
        className="task"
        id={task.name}
        key={task.name}
        onMouseEnter={() => {
          this.setState({ hover: Date.now() });
        }}
        title={`${task.complete ? 'Завершена' : 'Создана'} ${formatDistance(
          subSeconds(task.timestamp, 0),
          this.state.hover,
          {
            addSuffix: true,
            locale: ru,
            includeSeconds: true,
          }
        )}`}
      >
        <label className="checkbox_label">
          <input
            disabled={task.complete ? true : false}
            id={`checkbox${task.name}`}
            type="checkbox"
            className="task_checkbox"
            checked={task.complete}
            onChange={() => {
              const checkbox = document.getElementById(`checkbox${task.name}`); // этот инпут нужно сделать отдельным компонентом, тогда можно будет прокинуть в него колбэк и сет стейт колбэк
              checkbox.setAttribute('disabled', 'disabled'); // если что то не понятно
              const taskinput = document.getElementById(`task_name${task.name}`);
              taskinput.classList.add('completedtask_name');
              localStorage.removeItem(JSON.stringify(task));
              task.complete = true;
              task.timestamp = Date.now();
              localStorage.setItem(JSON.stringify(task), false);
              tasks.splice(index, 1);
              this.inprocesstasks.splice(index, 1);
              this.completetasks.unshift(task);
              tasks.splice(this.inprocesstasks.length, 0, task);
              console.log(task);
              this.setState({ completeCounter: this.completetasks.length });
            }}
          ></input>
          <span className="custom_checkbox"></span>
        </label>
        <input
          className={`task_name ${task.complete ? 'completedtask_name' : ''}`}
          placeholder={task.name}
          disabled
          id={`task_name${task.name}`}
          onKeyUp={(event) => {
            const input = document.getElementById(`task_name${task.name}`);
            if (event.key === 'Enter' && input.value !== input.placeholder) {
              input.setAttribute('disabled', 'disabled');
            }
          }}
          onBlur={() => {
            const input = document.getElementById(`task_name${task.name}`);
            const uniqCheck = this.tasks.filter((task) => task.name === input.value);
            if (uniqCheck.length > 0 && tasks.length > 1) {
              alert('Имя задачи должно быть уникальным. Пожалуйста измените название задачи.');
              return;
            }
            if (input.value === '') {
              input.setAttribute('disabled', 'disabled');
            }
            this.tasks.forEach((elem) => {
              if (elem.name === task.name && input.value !== '') {
                elem.name = input.value;
              }
            });
            Object.keys(localStorage).forEach((key) => {
              const localStorageTask = JSON.parse(key);
              if (localStorageTask.name === input.placeholder && input.value !== '') {
                if (input.value !== input.placeholder) {
                  input.setAttribute('disabled', 'disabled');
                  input.placeholder = input.value;
                  localStorageTask.name = input.value;
                  const newKey = localStorage.getItem(key);
                  localStorage.removeItem(key);
                  localStorage.setItem(JSON.stringify(localStorageTask), newKey);
                  this.setState({ stateChange: this.state.stateChange + 1 });
                }
              }
            });
          }}
        ></input>
        <button
          className={`edit_button ${task.complete ? 'disappear' : ''}`}
          onClick={() => {
            const input = document.getElementById(`task_name${task.name}`);
            input.removeAttribute('disabled', 'disabled');
            input.focus();
          }}
        ></button>
        <DeleteButton taskprop={task} deleteCallback={this.deleteTask} />
      </div>
    ));
  };
  deleteTask = (taskprop) => {
    const task = document.getElementById(taskprop.name);
    const arrayWithoutTask = this.tasks.filter((item) => item.name !== task.id);
    const completeArrayWithoutTask = this.completetasks.filter((item) => item.name !== task.id);
    const inprocessArrayWithoutTask = this.inprocesstasks.filter((item) => item.name !== task.id);
    this.completetasks = completeArrayWithoutTask;
    this.inprocesstasks = inprocessArrayWithoutTask;
    this.tasks = arrayWithoutTask;
    Object.keys(localStorage).forEach((key) => {
      const localStorageTask = JSON.parse(key);
      if (localStorageTask.name === task.id) {
        localStorage.removeItem(key);
      }
    });
    this.setState({
      counter: this.tasks.length,
      completeCounter: this.completetasks.length,
      renderTasks: this.tasks,
    });
  };
  deleteButton = () => {
    this.tasks = this.tasks.filter((task) => !task.complete);
    this.inprocesstasks = [...this.tasks]; // Синхронизируем массив невыполненных задач
    this.completetasks = [];

    // Удаляем из localStorage все завершенные задачи
    Object.keys(localStorage).forEach((key) => {
      if (localStorage.getItem(key) === 'false') {
        localStorage.removeItem(key);
      }
    });

    this.setState({
      counter: 0,
      completeCounter: 0,
      renderTasks: [],
    });
  };
  handleEnter = (event) => {
    const input = document.querySelector('.input');
    const filter = this.tasks.filter((task) => task.name === input.value);
    if (filter.length !== 0) {
      alert('Имена задач не должны быть одинаковыми. Пожалуйста измените имя задачи, если хотите её добавить.');
      return;
    }
    if (input.value !== '' && event.key === 'Enter') {
      const obj = {
        name: input.value,
        complete: false,
        timestamp: Date.now(),
      };
      localStorage.setItem(JSON.stringify(obj), true);
      this.tasks.unshift(obj);
      this.inprocesstasks.unshift(obj);
      this.setState({ counter: this.tasks.length });
      input.value = '';
    }
  };
  handleClick = () => {
    const input = document.querySelector('.input');
    const filter = this.tasks.filter((task) => task.name === input.value);
    if (filter.length !== 0) {
      alert('Имена задач не должны быть одинаковыми. Пожалуйста измените имя задачи, если хотите её добавить.');
      return;
    }
    if (input.value !== '') {
      const obj = {
        name: input.value,
        complete: false,
        timestamp: Date.now(),
      };
      localStorage.setItem(JSON.stringify(obj), true);
      this.tasks.unshift(obj);
      this.inprocesstasks.unshift(obj);
      this.setState({ counter: this.tasks.length });
      input.value = '';
    }
  };
  handleCLickAllTasksBottomButton = () => {
    const button = document.querySelector('.allbutton');
    button.classList.add('active');
    const firstbutton = document.querySelector('.completebutton');
    const secondbutton = document.querySelector('.inprocessbutton');
    firstbutton.classList.remove('active');
    secondbutton.classList.remove('active');
    const clearTasksButton = document.querySelector('.deletebutton');
    clearTasksButton.classList.add('disappear');
    console.log(button);
    this.setState({ renderTasks: this.tasks });
    this.setState({ counter: this.tasks.length });
  };
  handleCLickCompleteTasksBottomButton = () => {
    const button = document.querySelector('.completebutton');
    button.classList.add('active');
    const firstbutton = document.querySelector('.allbutton');
    const secondbutton = document.querySelector('.inprocessbutton');
    firstbutton.classList.remove('active');
    secondbutton.classList.remove('active');
    const clearTasksButton = document.querySelector('.deletebutton');
    clearTasksButton.classList.remove('disappear');
    this.setState({ renderTasks: this.completetasks });
    this.setState({ counter: this.completetasks.length });
  };
  handleCLickInProcessTasksBottomButton = () => {
    const button = document.querySelector('.inprocessbutton');
    button.classList.add('active');
    const firstbutton = document.querySelector('.allbutton');
    const secondbutton = document.querySelector('.completebutton');
    firstbutton.classList.remove('active');
    secondbutton.classList.remove('active');
    const clearTasksButton = document.querySelector('.deletebutton');
    clearTasksButton.classList.add('disappear');
    this.inprocesstasks.sort((a, b) => b.timestamp - a.timestamp);
    this.setState({ renderTasks: this.inprocesstasks });
    this.setState({ counter: this.inprocesstasks.length });
    this.setState({ completeCounter: 0 });
  };
  render() {
    console.log(this.completetasks);
    console.log(this.inprocesstasks);
    console.log(this.tasks);
    return (
      <div>
        <MainLogotype />
        <InputBlock callback={this.handleClick} enterCallback={this.handleEnter} />
        <BottomButtons
          alltasks={this.handleCLickAllTasksBottomButton}
          completetasks={this.handleCLickCompleteTasksBottomButton}
          inprocesstasks={this.handleCLickInProcessTasksBottomButton}
          deletebutton={this.deleteButton}
        />
        <TasksCounter counter={this.state.counter} secondCounter={this.state.completeCounter} />
        <TaskList callback={this.renderList} tasks={this.state.renderTasks} deletetask={this.deleteTask} />
      </div>
    );
  }
}

export default NewFile;
