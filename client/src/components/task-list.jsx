import React from 'react';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e) {
    this.props.handlecheck(e.target.id, e.target.checked)
  }

  render() {
    return (
      <ul>
        {this.props.tasks.map(task => (
          <li key={task.id}>
            <label className={task.isComplete ?   "completed" : null}>
              <input
                type="checkbox"
                id={task.id}
                checked={task.isComplete}
                onChange={this.handleCheck}
              />
              {task.name}
            </label>
          </li>
        ))}
      </ul>
    );
  }
}
