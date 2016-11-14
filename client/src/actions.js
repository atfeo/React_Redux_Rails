module.exports = {
  loadTasks,
  addTask,
  textExists,
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
