import React from 'react';
import Course from './Course';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Pagination from '../../utils/Pagination';
import {handleInput} from '../../utils/InputHandle';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

class CourseList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      courses: [],
      page: 1,
      pages: 0,
      on_slider_index: 1
    };
    this.handleDeleted = this.handleDeleted.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleFormSliderSubmit = this.handleFormSliderSubmit.bind(this)
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
      headers: {'Authorization': this.props.authenticity_token},
      params: {
        page: page
      }
    })
    .then(response => {
      const {courses, page, pages, on_slider_index} = response.data.content;
      this.setState({courses, page, pages, on_slider_index});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChangePage(page) {
    this.getDataFromApi(page);
  }

  handleFormSliderSubmit(event) {
    const {on_slider_index} = this.state;

    axios.get(`/v1/courses.json`,
      {
        headers: {'Authorization': this.props.authenticity_token},
        params: {
          on_slider_index: on_slider_index
        }
      })
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.setState({submitSuccess: true});
          $.growl.notice({message: formatMessage(defaultMessages.adminUsersAddSuccess)});
        } else {
          this.setState({errors: content});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <form role="form" onSubmit={this.handleFormSliderSubmit}>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCoursesSlider)}
                </label>
                <select onChange={handleInput.bind(this)} ref="slider"
                  value={this.state.on_slider_index} name="on_slider_index"
                  className="form-control" required>
                  {
                    this.state.courses.map(function(course) {
                      return <option key={course.id}
                        value={course.id}>{course.name}</option>;
                    })
                  }
                </select>
              </div>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminUsersSave)}
                </button>
              </div>
            </form>
          </div>
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
                    <Course {...course} key={course.id} authenticity_token={this.props.authenticity_token} handleDeleted={this.handleDeleted}/>
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
