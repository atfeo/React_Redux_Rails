import React from 'react';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addtask(this.newTask.value);
    this.newTask.value = '';
  }

  handleKeyup(e) {
    this.props.handlekeyup(e.target.value);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ float: "left" }}
      >
        <input
          type="text"
          ref={(ref) => this.newTask = ref}
          onKeyUp={this.handleKeyup} placeholder="new task"
        />
        <button
          type="submit"
          disabled={!this.props.istext}
        >
          Add Task # {this.props.objects.length + 1}
        </button>
      </form>
    );
  }
}
