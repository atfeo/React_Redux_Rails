import React from 'react';

export default class ErrorMessage extends React.Component {
  render() {
    const style = {
      marginTop: "5px",
      paddingLeft: "10px",
      color: "white",
      backgroundColor: "red",
    };

    return (
      <div style={style}>
        {this.props.message}
      </div>
    );
  }
}
