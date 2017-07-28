import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';
import {handleInputChange} from '../../utils/InputHandler';
import ReactTags from 'react-tag-autocomplete';
import TagsCss from '../../../../assets/styles/tags.css';
import {ReactMde, ReactMdeCommands} from 'react-mde';
import 'react-mde/lib/styles/react-mde.css';
import 'react-mde/lib/styles/react-mde-command-styles.css';
import 'react-mde/lib/styles/markdown-default-theme.css';

const csrfToken = ReactOnRails.authenticityToken();

class EditNews extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      title: "",
      content: {text: "", selection: null},
      submitSuccess: false,
      errors: [],
      url: "",
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content.text);
    if(this.state.url != ""){
      formData.append("image_attributes[url]", this.state.url);
    }
    axios.patch(`/v1/newses/${id}.json`,
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

  contentChangeHandle(value) {
    this.setState({content: value});
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

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/newses/${id}/edit.json`)
      .then(response => {
        const {title} = response.data.content.news;
        let url = "";
        if(response.data.content.image != null) {
          url = response.data.content.image.url;
        }
        const text = response.data.content.news.content;
        const content = {text: text, selection: null};
        this.setState({title, content, url});
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {formatMessage} = this.props.intl;
    let commands = ReactMdeCommands.getDefaultCommands();

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
              <div className="form-group row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminNewsesAvatar)}
                  </label>
                  <input type="file" ref="image_attributes_url" name="image_attributes_url"
                    onChange={this.handleFileChange}></input>
                </div>
                <div className="col-md-8">
                  {
                    this.state.url && (
                      <div className="col-md-1">
                        <img className="preview-image" src={this.state.url}/>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">
                      {formatMessage(defaultMessages.adminNewsesContent)}
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
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminNewsesEdit)}
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
