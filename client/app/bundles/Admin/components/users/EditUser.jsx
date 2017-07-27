import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';
import {handleInput} from '../../utils/InputHandle';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {ReactMde, ReactMdeCommands} from 'react-mde';
import 'react-mde/lib/styles/react-mde.css';
import 'react-mde/lib/styles/react-mde-command-styles.css';
import 'react-mde/lib/styles/markdown-default-theme.css';

const csrfToken = ReactOnRails.authenticityToken();

class EditUser extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      name: "",
      role: "",
      quote: "",
      submitSuccess: false,
      url: "",
      errors: [],
      roles: [],
      introduction: {text: "", selection: null},
      position: "",
      display_order: 0,
    }
  }

  introductionChangeHandle(value) {
    this.setState({introduction: value});
  }

  handleFileChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const that = this;

    reader.onloadend = function() {
      that.setState({url: reader.result});
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({url: ""});
    }
  }

  handleFormSubmit(e) {
    const {formatMessage} = this.props.intl;

    e.preventDefault();
    let id = this.props.match.params.id;
    const {name, role, quote, position, url, introduction, display_order} = this.state;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("quote", quote);
    formData.append("introduction", introduction.text);
    formData.append("position", position);
    formData.append("display_order", display_order);
    if(this.state.url != ""){
      formData.append("image_attributes[url]", url);
    }

    axios.patch(`/v1/users/${id}.json`,
      formData,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'json'
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

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/users/${id}/edit.json`)
      .then(response => {
        const {name, role, quote, position, display_order} = response.data.content.user;
        let url = "";
        if(response.data.content.image != null) {
          url = response.data.content.image.url;
        }
        const text = response.data.content.user.introduction;
        const introduction = {text: text, selection: null};
        this.setState({name, role, quote, url, introduction, position, display_order});
      })
      .catch(error => {
        console.log(error);
      });
    $.getJSON('/v1/users/new.json', (response) => {
      this.setState({roles: response.content.roles});
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    let commands = ReactMdeCommands.getDefaultCommands();

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/users/">
        </Redirect>
      );
    } else {
      return (
        <div className="row">
          <div className="form-group col-md-7 col-md-offset-2 col-sm-6">
            {
              this.state.url && (
                <div className="col-md-1">
                  <img className="preview-image" src={this.state.url}/>
                </div>
              )
            }
          </div>
          <div className="col-md-7 col-md-offset-2">
            {
              this.state.errors.length > 0 && <Errors errors={this.state.errors}/>
            }
            <form role="form" onSubmit={this.handleFormSubmit} id="edit-user-form">
              <div className="form-group">
                <input type="file" ref="image_attributes_url" name="image_attributes_url"
                  onChange={this.handleFileChange}></input>
              </div>
              <input type="hidden" ref="authenticity_token" value={csrfToken}/>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersName)}
                </label>
                <input ref="name" name="name" type="text" className="form-control"
                  value={this.state.name} onChange={handleInput.bind(this)}
                  required="required"/>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersRole)}
                </label>
                <select onChange={handleInput.bind(this)} ref="role" value={this.state.role} name="role" className="form-control" required>
                  <option disabled>choose role</option>
                  {
                    this.state.roles.map(function(role) {
                      return <option key={role}
                        value={role}>{role}</option>;
                    })
                  }
                </select>
              </div>

              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersQuote)}
                </label>
                <textarea form="edit-user-form" rows="5" ref="quote"
                  name="quote" type="text" className="form-control"
                  value={this.state.quote || ""} onChange={handleInput.bind(this)}/>
              </div>

              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersPosition)}
                </label>
                <input ref="position" name="position" type="text" className="form-control"
                  value={this.state.position} onChange={handleInput.bind(this)} />
              </div>

              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersDisplayOrder)}
                </label>
                <input ref="display_order" name="display_order" type="number" className="form-control"
                  value={this.state.display_order} onChange={handleInput.bind(this)} />
              </div>

              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminUsersIntroduction)}
                </label>
                <div className="mde">
                  <ReactMde
                    value={this.state.introduction}
                    onChange={this.introductionChangeHandle.bind(this)}
                    commands={commands} />
                </div>
              </div>

              <input type="hidden" ref="authenticity_token" value={csrfToken}/>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminUsersSave)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(EditUser);
