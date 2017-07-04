import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';
import {handleInputChange} from '../../utils/InputHandler';
import SimpleMDE from 'react-simplemde-editor';
import ReactTags from 'react-tag-autocomplete';
import TagsCss from '../../../../assets/styles/tags.css';

const csrfToken = ReactOnRails.authenticityToken();

class EditNews extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      title: "",
      content: "",
      submitSuccess: false,
      errors: []
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    axios.post(`/v1/newses.json`,
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
          $.growl.notice({message: message});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  contentChangeHandle(value) {
    this.setState({content: value});
  }

  render() {
    const {formatMessage} = this.props.intl;

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/newses/">
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
                  {formatMessage(defaultMessages.adminNewsesTitle)}
                </label>
                <input ref="title" name="title" type="text" className="form-control"
                  value={this.state.title} onChange={handleInputChange.bind(this)}
                  required="required"/>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">
                      {formatMessage(defaultMessages.adminNewsesContent)}
                    </label>
                    <SimpleMDE value={this.state.content} options={{spellChecker: false}}
                      onChange={this.contentChangeHandle.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminNewsesAdd)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(EditNews);
