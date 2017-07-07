import React from 'react';
import RegistrationCourse from './RegistrationCourse';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import axios from 'axios';
import Pagination from '../../utils/Pagination';
import SearchForm from '../../utils/SearchForm';

class RegistrationCourseIndex extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      registration_courses: [],
      email_content: "",
      page: 1,
      pages: 0,
      search_word: ""
    };
    this.handleDeleted = this.handleDeleted.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleDeleted(id, message) {
    this.setState({
      registration_courses: this.state.registration_courses.filter(registration_course => {
        return registration_course.id !== id
      })
    });
    $.growl.notice({message: message});
  }

  handleInputChange(e) {
    this.setState({email_content: e.target.value});
  }

  componentDidMount() {
    this.getDataFromApi(this.state.page);
  }

  getDataFromApi(page) {
    axios.get('/v1/registration_courses.json', {
      params: {
        page: page,
        query: this.state.search_word
      }
    })
    .then(response => {
      const {registration_courses, page, pages} = response.data.content;
      this.setState({registration_courses, page, pages});
    })
    .catch(error => {
      console.log(error);
    });    
  }

  handleChangePage(page) {
    this.getDataFromApi(page);
  }

  handleSearch(data, search_word) {
    const {registration_courses, page, pages} = data;
    this.setState({registration_courses, page, pages, search_word});
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminRegistrationCoursesRegistration)}</h2>
          </div>
          <div className="clearfix">
            <div className="col-md-4">
              <SearchForm handleSearch={this.handleSearch} />
            </div>
          </div>
          <div className="empty-space marg-lg-b20"></div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesName)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesEmail)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesPhone)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesAddress)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesCourse)}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.registration_courses.map(registration_course => (
                    <RegistrationCourse {...registration_course}
                      key={registration_course.id}
                      handleDeleted={this.handleDeleted}/>
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

export default injectIntl(RegistrationCourseIndex);
