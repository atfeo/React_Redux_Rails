import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import TodoApp from './components/todo-app.jsx';

function reducer(state = { tasks: [] }, action) {
  switch (action.type) {
    case 'TASKS_LOADED':
      return Object.assign({}, state, { tasks: action.data });
    case 'TOGGLE_LOADING':
      return Object.assign({}, state, { isLoading: action.data });
    case 'TASK_ADDED':
      return Object.assign({}, state, { tasks: state.tasks.concat(action.data) });
    case 'TEXT_EXISTS':
      return Object.assign({}, state, { isText: action.data });
    case 'TASK_COMPLETION_CHANGED': {
      const taskIndex = state.tasks.findIndex((task) => {
        return task.id == action.data.id;
      });
      const newTasks = [
        ...state.tasks.slice(0, taskIndex),
        Object.assign({}, state.tasks[taskIndex], { isComplete: action.data.isComplete }),
        ...state.tasks.slice(taskIndex + 1),
      ];
      return Object.assign({}, state, { tasks: newTasks });
    }
    case 'SHOW_ERROR':
      return Object.assign({}, state, { isError: true, errorMessage: action.data });
    case 'HIDE_ERROR':
      return Object.assign({}, state, { isError: false, errorMessage: '' });
    case 'DELETED_TASKS': {
      const newTasks = state.tasks.slice();
      for (let i = 0; i < action.data.length; i += 1) {
        const taskIndex = newTasks.findIndex((task) => {
          return task.id == action.data[i];
        });
        newTasks.splice(taskIndex, 1);
      }
      return Object.assign({}, state, { tasks: newTasks });
    }
    case 'DELETED_TASK': {
      const newTasks = state.tasks.filter((task) => {
        return task.id != action.data;
      });
      return Object.assign({}, state, { tasks: newTasks });
    }
    default:
      return state;
  }
}

const reduxStore = createStore(
  reducer,
  applyMiddleware(thunk)
);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={reduxStore}>
      <TodoApp />
    </Provider>,
    document.getElementById('content')
  );
});
