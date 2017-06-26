import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors'

const csrfToken = ReactOnRails.authenticityToken();

class NewCourseCategory extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: "",
      description: "",
      submitSuccess: false,
      errors: []
    }
  }

  handleInputChange(e) {
    let input = e.target.name;
    this.setState({[input]: e.target.value});
  }

  handleFormSubmit(e) {
    const {formatMessage} = this.props.intl;

    e.preventDefault();
    let id = this.props.match.params.id;
    const {name, description} = this.state;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    axios.post(`/v1/course_categories.json`,
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
        }
      })
      .catch(error => {
        $.growl.notice({message: error});
      });
  }

  render() {
    const {formatMessage} = this.props.intl;

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/course_categories/">
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
                  {formatMessage(defaultMessages.adminCourseCategoriesName)}
                </label>
                <input ref="name" name="name" type="text" className="form-control"
                  value={this.state.name} onChange={this.handleInputChange}
                  required="required"/>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminCourseCategoriesDescription)}
                </label>
                <textarea form="edit-certification-form" rows="5" ref="description"
                  name="description" type="text" className="form-control"
                  value={this.state.description} onChange={this.handleInputChange}/>
              </div>
              <input type="hidden" ref="authenticity_token" value={csrfToken}/>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminCourseCategoriesSave)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(NewCourseCategory);
