import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

const csrfToken = ReactOnRails.authenticityToken();

export default class CourseSchedule extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
  }

  onDeleteHandle(e) {
    let {id} = this.props;
    if (confirm("Delete the item?") == true) {
      axios.delete(`/v1/course_schedules/${id}.json`, null,
        {
          headers: {'X-CSRF-Token': csrfToken},
          responseType: 'json'
        }
      )
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.props.handleDeleted(content.id);
        } else {
          $.growl.error({message: message});
        }
      });
    }
  }

  render() {
    const {start_date, end_date, deadline_date, course, id, code} = this.props;
    return (
      <tr className="active">
        <td>{code}</td>
        <td>{course.name}</td>
        <td>{start_date}</td>
        <td>{end_date}</td>
        <td>{deadline_date}</td>
        <td>
          <Link to={`/admin/course_schedules/${id}/edit`}>
            <button className="btn btn-warning"><i className="fa fa-pencil-square-o"
              aria-hidden="true"></i></button>
          </Link>
          <span>&nbsp;</span>
          <a className="btn btn-danger" onClick={this.onDeleteHandle.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    );
  }
}
