import React from 'react';
import Course from './Course';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class CourseList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      courses: [],
    };
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleDeleted(id) {
    const {formatMessage} = this.props.intl;

    this.setState({
      courses: this.state.courses.filter(course => {
        return course.id !== id;
      })
    });
    $.growl.notice({message: formatMessage(defaultMessages.adminCoursesDeleteSuccess)});
  }

  componentDidMount() {
    $.getJSON('/v1/courses.json', (response) => {
      this.setState({courses: response.content});
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminCoursesCourse)}</h2>
            <Link to="/admin/courses/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminCoursesAdd)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                    <th>{formatMessage(defaultMessages.adminCoursesName)}</th>
                    <th>{formatMessage(defaultMessages.adminCoursesDescription)}</th>
                    <th>{formatMessage(defaultMessages.adminCoursesEdit)}</th>
                    <th>{formatMessage(defaultMessages.adminCoursesDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.courses.map(course => (
                    <Course {...course} key={course.id} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CourseList);
