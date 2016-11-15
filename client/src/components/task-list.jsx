import React from 'react';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleCheck(e) {
    this.props.handlecheck(e.target.id, e.target.checked)
  }

  handleClick(e) {
    this.props.handledeletetask(e.target.id)
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
            {task.isComplete ? <button
              className="del"
              id={task.id}
              onClick={this.handleClick}
              style={{ float: "right" }}
            >
              Del
            </button> : null}
          </li>
        ))}
      </ul>
    );
  }
}
