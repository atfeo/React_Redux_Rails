import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions.js';

import TaskList from './task-list.jsx';
import LoadingIndicator from './loading-indicator.jsx';
import TaskForm from './task-form.jsx';
import ErrorMessage from './error-message.jsx';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
    this.handleTaskCompletionChange = this.handleTaskCompletionChange.bind(this);
    this.handleDeleteTasks = this.handleDeleteTasks.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.loadTasks());
  }

  handleNewTask(task) {
    this.props.dispatch(actions.addTask(task))
  }

  handleInputForm(value) {
    this.props.dispatch(actions.textExists(value))
  }

  handleTaskCompletionChange(id, isComplete) {
    this.props.dispatch(actions.toggleComplete(id, isComplete))
  }

  complete(task) {
    return task.isComplete == true
  }

  handleDeleteTasks() {
    let ids = [];
    const comp = this.props.tasks.filter((task) => this.complete(task));
    for (let i = 0; i < comp.length; i += 1) {
      ids[i] = comp[i].id;
    }
    this.props.dispatch(actions.deleteTasks(ids));
  }

  handleDeleteTask(id) {
    this.props.dispatch(actions.deleteTask(id))
  }

  render() {
    return (
      <div>
        <h3>Todo List</h3>
        <TaskForm
          addtask={this.handleNewTask}
          handlekeyup={this.handleInputForm}
          objects={this.props.tasks}
          istext={this.props.isText}
        />
        <button
          className="del"
          onClick={this.handleDeleteTasks}
          disabled={this.props.tasks.filter(this.complete).length == 0}
        >
          Del Tasks X {this.props.tasks.filter(this.complete).length}
        </button>
        <div style={{ clear: "both" }} />
        {this.props.isError ? <ErrorMessage
          message={this.props.errorMessage}
        /> : null}
        {this.props.isLoading ? <LoadingIndicator /> : null}
        <TaskList
          tasks={this.props.tasks}
          handlecheck={this.handleTaskCompletionChange}
          handledeletetask={this.handleDeleteTask}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, isText, isError, errorMessage } = state;
  return {
    tasks,
    isLoading,
    isText,
    isError,
    errorMessage,
  };
}

export default connect(mapStateToProps)(TodoApp)
