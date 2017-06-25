import React from 'react';

class CourseStatus extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  onChangeHandle(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <select className="form-control" onChange={this.onChangeHandle} value={this.props.selected}>
          {
            this.props.statuses.map((status, index) => (
              <option key={index} value={status}>{status}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default CourseStatus;
