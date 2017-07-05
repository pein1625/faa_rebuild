import React from 'react';

class Courses extends React.Component {
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
            this.props.courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default Courses;
