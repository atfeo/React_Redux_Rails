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
