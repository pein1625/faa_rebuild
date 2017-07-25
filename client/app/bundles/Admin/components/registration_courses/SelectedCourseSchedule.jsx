import React from 'react';

class SelectedCourseSchedule extends React.Component {
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
        <select className="form-control" onChange={this.onChangeHandle}
          value={this.props.selected}>
          {
            this.props.course_schedules.map(schedule => (
              <option key={schedule.id} value={schedule.id}>{schedule.code}</option>
            ))
          }
          <option key={0} value={0}>{"--All"}</option>
        </select>
      </div>
    );
  }
}

export default SelectedCourseSchedule;
