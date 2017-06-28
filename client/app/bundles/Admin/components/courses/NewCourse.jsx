import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';
import Upload from '../uploads/Upload';
import ReactBoostrap from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import morrisCss from '../../../../assets/styles/mde.css';
import CourseCategory from './CourseCategory';
import CourseStatus from './CourseStatus';
import {handleInputChange} from '../../utils/InputHandler';
import SimpleMDE from 'react-simplemde-editor';


const csrfToken = ReactOnRails.authenticityToken();

class NewCourse extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.fileChangeHandle = this.fileChangeHandle.bind(this);
    this.addImageHandle = this.addImageHandle.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
    this.categoryInputChange = this.categoryInputChange.bind(this);

    this.state = {
      name: "",
      description: "",
      submitSuccess: false,
      errors: [],
      urls: [],
      categories: [],
      category: null,
      start_date: "",
      end_date: "",
      registration_deadline: "",
      schedule: "",
      status: "opening",
      course_category_id: "1",
      statuses: []
    };
  }

  addImageHandle(e) {
    if(this.state.urls.indexOf(null) !== -1) {
      return;
    }

    this.setState({
      urls: [
        ...this.state.urls, null
      ]
    });
  }

  categoryInputChange(newValue) {
    this.setState({course_category_id: newValue});
  }

  statusInputChange(newValue) {
    this.setState({status: newValue});
  }

  handleDeleteImage(index) {
    this.setState({
      urls: this.state.urls.filter((url, i) => {
        return i !== index;
      })
    });
  }

  fileChangeHandle(newUrl, index) {
    this.setState({
      urls: this.state.urls.map((url, i) => {
        return (index === i) ? newUrl : url;
      })
    });
  }

  contentChangeHandle(value) {
    this.setState({content: value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("start_date", this.state.start_date);
    formData.append("end_date", this.state.end_date);
    formData.append("registration_deadline", this.state.registration_deadline);
    formData.append("cost", this.state.cost);
    formData.append("status", this.state.status);
    formData.append("course_category_id", this.state.course_category_id);
    formData.append("place", this.state.place);
    formData.append("content", this.state.content);
    this.state.urls.forEach(url => {
      formData.append("images_attributes[][url]", url);
    });

    axios.post(`/v1/courses.json`,
      formData,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'json'
      })
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.setState({submitSuccess: true});
          $.growl.notice({message: message});
        } else {
          this.setState({errors: content});
          $.growl.error({message: message});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/courses/new.json`)
      .then(response => {
        const {categories} = response.data.content;
        const {statuses} = response.data.content;
        this.setState({
          categories, statuses
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleStartDateChange(value, formattedValue) {
    this.setState({
      start_date: value
    });
  }

  handleEndDateChange(value, formattedValue) {
    this.setState({
      end_date: value
    });
  }

  handleRegistrationDeadline(value, formattedValue) {
    this.setState({
      registration_deadline: value
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/courses/">
        </Redirect>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-7 col-md-offset-2">
            {
              this.state.errors.length > 0 && <Errors errors={this.state.errors}/>
            }
            <form role="form" onSubmit={this.handleFormSubmit} id="edit-certification-form">
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCoursesName)}
                </label>
                <input name="name" type="text" className="form-control"
                  value={this.state.name} onChange={handleInputChange.bind(this)}
                  required="required"/>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCoursesDescription)}
                </label>
                <textarea form="edit-certification-form" rows="5" name="description"
                  type="text" className="form-control"
                  value={this.state.description} onChange={handleInputChange.bind(this)}/>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesStartDate)}
                  </label>
                  <div className="form-group">
                    <DatePicker name="start_date" value={this.state.start_date}
                      onChange={this.handleStartDateChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesEndDate)}
                  </label>
                  <div className="form-group">
                    <DatePicker value={this.state.end_date}
                      onChange={this.handleEndDateChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesDeadline)}
                  </label>
                  <div className="form-group">
                    <DatePicker value={this.state.registration_deadline}
                      onChange={this.handleRegistrationDeadline.bind(this)}/>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesCost)}
                  </label>
                  <div className="form-group">
                    <input name="cost" type="number" min="0.0" step="1000" className="form-control"
                      value={this.state.cost} onChange={handleInputChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesStatus)}
                  </label>
                  <CourseStatus statuses={this.state.statuses}
                    handleChange={this.statusInputChange.bind(this)} selected={this.state.status}/>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesCategory)}
                  </label>
                  <CourseCategory categories={this.state.categories}
                    handleChange={this.categoryInputChange} selected={this.state.course_category_id}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCoursesPlace)}
                </label>
                <input name="place" type="text" className="form-control"
                  value={this.state.place} onChange={handleInputChange.bind(this)}/>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">
                      {formatMessage(defaultMessages.adminCoursesContent)}
                    </label>
                    <SimpleMDE value={this.state.content} options={{spellChecker: false}}
                      onChange={this.contentChangeHandle.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {
                    this.state.urls.map((url, index) => (
                      <Upload url={url} key={index} fileChangeHandle={this.fileChangeHandle}
                        index={index} handleDeleteImage={this.handleDeleteImage}/>
                    ))
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <a className="btn btn-success" onClick={this.addImageHandle}>
                      {formatMessage(defaultMessages.adminCoursesAddImage)}
                    </a>
                  </div>
                </div>
              </div>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminCoursesAdd)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(NewCourse);
