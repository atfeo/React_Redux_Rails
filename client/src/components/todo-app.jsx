import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions.js';

import TaskList from './task-list.jsx';
import LoadingIndicator from './loading-indicator.jsx';
import TaskForm from './task-form.jsx';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
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
        {this.props.isLoading ? <LoadingIndicator /> : null}
        <TaskList tasks={this.props.tasks} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, isText } = state;
  return {
    tasks,
    isLoading,
    isText,
  };
}

export default connect(mapStateToProps)(TodoApp)
