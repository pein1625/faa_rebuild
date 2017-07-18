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
import {handleInputChange} from '../../utils/InputHandler';
import SimpleMDE from 'react-simplemde-editor';

const csrfToken = ReactOnRails.authenticityToken();

class EditCourse extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.fileChangeHandle = this.fileChangeHandle.bind(this);
    this.addImageHandle = this.addImageHandle.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);

    this.state = {
      name: "",
      description: "",
      content: "",
      submitSuccess: false,
      errors: [],
      urls: [],
      technique: ""
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
    formData.append("cost", this.state.cost);
    formData.append("content", this.state.content);
    formData.append("technique", this.state.technique);
    this.state.urls.forEach(url => {
      formData.append("images_attributes[][url]", url);
    });

    axios.patch(`/v1/courses/${id}.json`,
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
    axios.get(`/v1/courses/${id}/edit.json`)
      .then(response => {
        const {name, description, cost, content, technique} = response.data.content.course;
        const {images} = response.data.content;
        const urls = images.map(image => (
          image.url
        ));
        this.setState({
          name, description, cost, content, urls, technique
        });
      })
      .catch(error => {
        console.log(error);
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

              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCoursesTechnique)}
                </label>
                <input name="technique" type="text" className="form-control"
                  value={this.state.technique} onChange={handleInputChange.bind(this)}
                  required="required"/>
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
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">
                      {formatMessage(defaultMessages.adminCoursesContent)}
                    </label>
                    <SimpleMDE value={this.state.content}
                      onChange={this.contentChangeHandle.bind(this)}
                      options={{
                        spellChecker: false
                      }} />
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
                  {formatMessage(defaultMessages.adminCoursesEdit)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(EditCourse);
