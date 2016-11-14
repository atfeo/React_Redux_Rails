module.exports = {
  loadTasks,
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
