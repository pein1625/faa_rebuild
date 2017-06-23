import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';

const csrfToken = ReactOnRails.authenticityToken();

class NewsCategoryEdit extends React.Component {
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
    e.preventDefault();
    let id = this.props.match.params.id;
    const {name, description} = this.state;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    axios.patch(`/v1/news_categories/${id}.json`,
      formData,
      {
        headers: {'X-CSRF-Token': csrfToken, 'Content-Type': 'multipart/form-data'},
        responseType: 'json'
      })
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.setState({submitSuccess: true});
          $.growl.notice({message: message});
        } else {
          this.setState({errors: content});
          $.growl.notice({message: message});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/news_categories/${id}/edit.json`)
      .then(response => {
        const {name} = response.data.content;
        const {description = ''} = response.data.content;
        this.setState({name, description});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {formatMessage} = this.props.intl;

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/news_categories/">
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
                  {formatMessage(defaultMessages.adminNewsCategoriesName)}
                </label>
                <input ref="name" name="name" type="text" className="form-control"
                  value={this.state.name} onChange={this.handleInputChange}
                  required="required"/>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminNewsCategoriesDescription)}
                </label>
                <textarea form="edit-certification-form" rows="5" ref="description"
                  name="description" type="text" className="form-control"
                  value={this.state.description} onChange={this.handleInputChange}/>
              </div>
              <input type="hidden" ref="authenticity_token" value={csrfToken}/>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminCertificationsEdit)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(NewsCategoryEdit);
