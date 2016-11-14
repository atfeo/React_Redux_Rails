module.exports = {
  loadTasks,
  addTask,
  textExists,
  toggleComplete,
};

function loadTasks() {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    $.ajax({
      url: '/api/tasks.json',
      dataType: 'json',
      success: (res) => {
        setTimeout(() => {
          dispatch(tasksloaded(res.tasks));
          dispatch(toggleLoading(false));
        }, 2000)
      },
      error: (xhr, status, err) => {
        dispatch(toggleLoading(false));
        dispatch(tempErrorMessage('API Error'));
        console.log('/api/tasks.json', status, err.toString());
      },
    });
  };
}

function tasksloaded(tasks) {
  return { type: 'TASKS_LOADED', data: tasks };
}

function toggleLoading(isLoading) {
  return { type: 'TOGGLE_LOADING', data: isLoading };
}

function addTask(newTask) {
  return (dispatch) => {
    dispatch(toggleLoading(true));
    $.ajax({
      url: '/api/tasks.json',
      type: 'POST',
      dataType: 'json',
      data: { name: newTask },
      success: (res) => {
        dispatch(newTaskAdded(res.id, res.name));
        dispatch(toggleLoading(false));
      },
      error: (xhr, status, err) => {
        dispatch(toggleLoading(false));
        dispatch(tempErrorMessage('API Error'));
        console.log('/api/tasks.json', status, err.toString());
      },
    });
  };
}

function newTaskAdded(id, name) {
  return { type: 'TASK_ADDED', data: { id, name } };
}

function textExists(value) {
  return { type: 'TEXT_EXISTS', data: value };
}

function toggleComplete(id, isComplete) {
  return (dispatch) => {
    $.ajax({
      url: `/api/tasks/${id}`,
      type: 'PATCH',
      dataType: 'json',
      data: { isComplete },
      success: (res) => {
        dispatch(completeChanged(res.id, res.isComplete));
      },
      error: (xhr, status, err) => {
        dispatch(tempErrorMessage('API Error'));
        dispatch(completeChanged(id, !isComplete));
        console.log(`/api/tasks/${id}`, status, err.toString());
      },
    });
  };
}

function completeChanged(id, isComplete) {
  return {
    type: 'TASK_COMPLETION_CHANGED',
    data: { id, isComplete },
  };
}

function showError(message) {
  return { type: 'SHOW_ERROR', data: message };
}

function hideError() {
  return { type: 'HIDE_ERROR' };
}

function tempErrorMessage(message) {
  return (dispatch) => {
    dispatch(showError(message));
    setTimeout(() => {
      dispatch(hideError());
    }, 2000);
  };
}
