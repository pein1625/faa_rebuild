import React from 'react';
import TemporaryRegistration from './TemporaryRegistration';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import axios from 'axios';
import Pagination from '../../utils/Pagination';
import SearchForm from '../../utils/SearchForm';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import ReactOnRails from 'react-on-rails';
const csrfToken = ReactOnRails.authenticityToken();

class TemporaryRegistrationIndex extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      registration_courses: [],
      email_content: "",
      page: 1,
      pages: 0,
      search_word: "",
    };
    // this.handleDeleted = this.handleDeleted.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
    this.onEditHandle = this.onEditHandle.bind(this);
  }

  handlerClickCleanFiltered() {
    this.refs.inStockDate.cleanFiltered();
  }

  onDeleteHandle(cell) {
    if (confirm("Delete the item?") == true) {
      axios.delete(`/v1/temporary_registrations/${cell}.json`, null,
        {
          headers: {'X-CSRF-Token': csrfToken, 'Authorization': this.props.authenticity_token},
          responseType: 'JSON'
        }
      )
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          // this.props.handleDeleted(content.id, message);
          this.setState({
            registration_courses: this.state.registration_courses.filter(registration_course => {
              return registration_course.id !== content.id
            })
          });
          $.growl.notice({message: message});
        } else {
          $.growl.error({message: message});
        }
      });
    }
  }

  onEditHandle(e){
    let new_registration_courses = this.state.registration_courses
     .filter((item) => item.id == e.target.id)
     .map(item => item.comment = e.target.value);
    this.setState(new_registration_courses);

    let formData = new FormData();
    formData.append("comment", e.target.value);
    // console.log(e.target.name);
    $(e.target.id).val(e.target.value);
    axios.put(`/v1/temporary_registrations/${e.target.id}.json`, formData,
        {
          headers: {'X-CSRF-Token': csrfToken, 'Authorization': this.props.authenticity_token},
          responseType: 'JSON'
        }
      )
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          // this.props.handleDeleted(content.id, message);
        } else {
          $.growl.error({message: message});
        }
      });
  }
  // handleDeleted(id, message) {
  //   this.setState({
  //     registration_courses: this.state.registration_courses.filter(registration_course => {
  //       return registration_course.id !== id
  //     })
  //   });
  //   $.growl.notice({message: message});
  // }

  handleInputChange(e) {
    this.setState({email_content: e.target.value});
  }

  componentDidMount() {
    this.getDataFromApi(this.state.page);
  }

  getDataFromApi(page) {
    axios.get('/v1/temporary_registrations.json', {
      headers: {'Authorization': this.props.authenticity_token},
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

  cellButton(cell, row, enumObject, rowIndex) {
      return (
         <button
            type="button"
            className="btn btn-danger"
            onClick={() =>
                this.onDeleteHandle(cell)} >
          <i className="fa fa-times" aria-hidden="true"></i>
         </button>
      )
   }

  cellTextArea(cell, row, enumObject, rowIndex) {
      return (
         <textarea
            id={row.id}
            name={row.id}
            onChange={this.onEditHandle.bind(this)} value={cell} >
          </textarea>
      )
   }

  timeFormatter(cell, row){
    var localDate = new Date(cell);
    var localDateString = localDate.toLocaleString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
    return localDateString
  }

  render() {
    const {formatMessage} = this.props.intl;

    const options = {
      insertBtn: this.createCustomInsertButton
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminTemporaryRegistrationsTitle)}</h2>
          </div>
          {/*<div className="clearfix">
            <div className="col-md-4">
              <SearchForm handleSearch={this.handleSearch}
                search_url='/v1/temporary_registrations.json'/>
            </div>
          </div>
          <div className="empty-space marg-lg-b20"></div>*/}
          <div className="table-responsive col-md-12">
            {/*<table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesName)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesEmail)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesPhone)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesAddress)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesCourse)}</th>
                  <th>{formatMessage(defaultMessages.adminRegistrationCoursesCreated)}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.registration_courses.map(registration_course => (
                    <TemporaryRegistration {...registration_course}
                      key={registration_course.id}
                      handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>*/}

            <BootstrapTable data={this.state.registration_courses} striped hover condensed pagination  search exportCSV>
              <TableHeaderColumn width='14%' dataField="name" isKey={true} dataSort={true} filter={ { type: 'TextFilter'} } >{formatMessage(defaultMessages.adminRegistrationCoursesName)}</TableHeaderColumn>
              <TableHeaderColumn width='14%' dataField="email" dataSort={true} filter={ { type: 'TextFilter'} }>{formatMessage(defaultMessages.adminRegistrationCoursesEmail)}</TableHeaderColumn>
              <TableHeaderColumn width='14%' dataField="phone" dataSort={true} filter={ { type: 'TextFilter'} }>{formatMessage(defaultMessages.adminRegistrationCoursesPhone)}</TableHeaderColumn>
              <TableHeaderColumn width='14%' dataField="address" dataSort={true} filter={ { type: 'TextFilter'} }>{formatMessage(defaultMessages.adminRegistrationCoursesAddress)}</TableHeaderColumn>
              <TableHeaderColumn width='14%' dataField="course_name" dataSort={true} filter={ { type: 'TextFilter'} }>{formatMessage(defaultMessages.adminRegistrationCoursesCourse)}</TableHeaderColumn>
              <TableHeaderColumn ref='inStockDate' width='12%' dataField="created_at" dataFormat={this.timeFormatter.bind(this)} dataSort={true} filter={ { type: 'DateFilter' } }>{formatMessage(defaultMessages.adminRegistrationCoursesCreated)}</TableHeaderColumn>
              <TableHeaderColumn width='15%' dataField="comment" dataFormat={this.cellTextArea.bind(this)}>Note</TableHeaderColumn>
              <TableHeaderColumn width='3%' dataField='id' dataFormat={this.cellButton.bind(this)}></TableHeaderColumn>
            </BootstrapTable>

          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(TemporaryRegistrationIndex);
