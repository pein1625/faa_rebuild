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
import {ReactMde, ReactMdeCommands} from 'react-mde';
import 'react-mde/lib/styles/react-mde.css';
import 'react-mde/lib/styles/react-mde-command-styles.css';
import 'react-mde/lib/styles/markdown-default-theme.css';

const csrfToken = ReactOnRails.authenticityToken();

class EditCourse extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.avatarChangeHandle = this.avatarChangeHandle.bind(this);
    this.coverChangeHandle = this.coverChangeHandle.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      name: "",
      description: "",
      content: {text: "", selection: null},
      submitSuccess: false,
      errors: [],
      avatar: "",
      cover: "",
      cost: "",
      technique: "",
      display_cost: ""
    };
  }

  avatarChangeHandle(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const that = this;

    reader.onloadend = function() {
      that.setState({avatar: reader.result});
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({avatar: ""});
    }
  }

  toggle(event) {
    this.setState({
      display_cost: !this.state.display_cost
    });
  }

  coverChangeHandle(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const that = this;

    reader.onloadend = function() {
      that.setState({cover: reader.result});
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({cover: ""});
    }
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
    formData.append("content", this.state.content.text);
    formData.append("technique", this.state.technique);
    formData.append("avatar", this.state.avatar);
    formData.append("cover", this.state.cover);
    formData.append("display_cost", this.state.display_cost);

    axios.patch(`/v1/courses/${id}.json`,
      formData,
      {
        headers: {'Authorization': this.props.authenticity_token},
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
    axios.get(`/v1/courses/${id}/edit.json`, {
      headers: {'Authorization': this.props.authenticity_token},
    })
      .then(response => {
        const {name, description, cost, technique, display_cost} = response.data.content.course;
        const text = response.data.content.course.content;
        const content = {text: text, selection: null};
        let avatar = "";
        let cover = "";
        if(response.data.content.avatar != null){
          avatar = response.data.content.avatar.url
        }
        if(response.data.content.cover != null){
          cover = response.data.content.cover.url
        }
        this.setState({
          name, description, cost, content, avatar, cover, technique, display_cost
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {formatMessage} = this.props.intl;
    let commands = ReactMdeCommands.getDefaultCommands();
    const checkbox = (
      <span>
        <input
          name="display_cost"
          type="checkbox"
          checked={this.state.display_cost}
          onClick={this.toggle.bind(this)} />
        <label className="text-danger"> {formatMessage(defaultMessages.adminCoursesDisplay)}</label>
      </span>
    );
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
                    <input name="cost" type="number" className="form-control"
                      value={this.state.cost || ""} onChange={handleInputChange.bind(this)}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                {checkbox}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">
                      {formatMessage(defaultMessages.adminCoursesContent)}
                    </label>
                    <div className="mde">
                      <ReactMde
                        value={this.state.content}
                        onChange={this.contentChangeHandle.bind(this)}
                        commands={commands} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4 col-sm-6">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesAvatar)}
                  </label>
                  <input type="file" ref="image_attributes_url" name="image_attributes_url"
                    onChange={this.avatarChangeHandle}></input>
                </div>
                <div className="form-group col-md-8 col-sm-6">
                  {
                    this.state.avatar && (
                      <div className="col-md-1">
                        <img className="preview-image" src={this.state.avatar}/>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4 col-sm-6">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesCover)}
                  </label>
                  <input type="file" ref="image_attributes_url" name="image_attributes_url"
                    onChange={this.coverChangeHandle}></input>
                </div>
                <div className="form-group col-md-8 col-sm-6">
                  {
                    this.state.cover && (
                      <div className="col-md-1">
                        <img className="preview-image" src={this.state.cover}/>
                      </div>
                    )
                  }
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
