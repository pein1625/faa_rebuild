import React from 'react';

class DayOfWeek extends React.Component {
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
          {Object.keys(this.props.dayOfWeek).map(function (key) {
            const value = this.props.dayOfWeek[key]
            return (
              <option key={key} value={key}>{value}</option>
            );
          }, this)}
        </select>
      </div>
    );
  }
}

export default DayOfWeek;
