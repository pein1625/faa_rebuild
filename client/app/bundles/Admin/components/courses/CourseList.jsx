import React from 'react';
import Course from './Course';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Pagination from '../../utils/Pagination';
import axios from 'axios';

class CourseList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      courses: [],
      page: 1,
      pages: 0
    };
    this.handleDeleted = this.handleDeleted.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
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
    this.getDataFromApi(this.state.page);
  }

  getDataFromApi(page) {
    axios.get('/v1/courses.json', {
      params: {
        page: page
      }
    })
    .then(response => {
      const {courses, page, pages} = response.data.content;
      this.setState({courses, page, pages});
    })
    .catch(error => {
      console.log(error);
    });    
  }

  handleChangePage(page) {
    this.getDataFromApi(page);
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
          <Pagination page={this.state.page}
            pages={this.state.pages}
            handleChangePage={this.handleChangePage} />
        </div>
      </div>
    );
  }
}

export default injectIntl(CourseList);
