import React from 'react';
import CourseSchedule from './CourseSchedule';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Pagination from '../../utils/Pagination';
import axios from 'axios';

class CourseScheduleList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      course_schedules: [],
      page: 1,
      pages: 0
    };
    this.handleDeleted = this.handleDeleted.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    this.getDataFromApi(this.state.page);
  }

  getDataFromApi(page) {
    axios.get('/v1/course_schedules.json', {
      params: {
        page: page
      }
    })
    .then(response => {
      const {course_schedules, page, pages} = response.data.content;
      this.setState({course_schedules, page, pages});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChangePage(page) {
    this.getDataFromApi(page);
  }

  handleDeleted(id) {
    const {formatMessage} = this.props.intl;

    this.setState({
      course_schedules: this.state.course_schedules.filter(schedule => {
        return schedule.id !== id;
      })
    });
    $.growl.notice({message: formatMessage(defaultMessages.adminCoursesDeleteSuccess)});
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminCoursesCourse)}</h2>
            <Link to="/admin/course_schedules/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminScheduleAdd)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                    <th>{formatMessage(defaultMessages.adminScheduleCode)}</th>
                    <th>{formatMessage(defaultMessages.adminScheduleCategory)}</th>
                    <th>{formatMessage(defaultMessages.adminScheduleStartDate)}</th>
                    <th>{formatMessage(defaultMessages.adminScheduleEndDate)}</th>
                    <th>{formatMessage(defaultMessages.adminScheduleDeadlineDate)}</th>
                    <th>{formatMessage(defaultMessages.adminScheduleSettings)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.course_schedules.map(schedule => (
                    <CourseSchedule {...schedule} key={schedule.id} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
          <Pagination page={this.state.page}
            pages={this.state.pages}
            handleChangePage={this.handleChangePage} />
        </div>
      </div>
    );
  }
}

export default injectIntl(CourseScheduleList);
