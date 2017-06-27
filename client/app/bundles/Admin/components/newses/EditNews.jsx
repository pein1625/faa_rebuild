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
import NewsCategory from './NewsCategory';

const csrfToken = ReactOnRails.authenticityToken();

class EditNews extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      title: "",
      content: "",
      categories: [],
      news_category_id: "",
      url: "",
      tags: [],
      all_tags: [],
      submitSuccess: false,
      errors: []
    };
  }

  handleFileChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const that = this;

    reader.onloadend = function() {
      that.setState({url: reader.result});
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({url: ""});
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("news_category_id", this.state.news_category_id);
    const tag_list = this.state.tags.map(tag => (
      tag.name
    ));
    formData.append("tag_list", tag_list);
    formData.append("image_attributes[url]", this.state.url);
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

  categoryInputChange(newValue){
    this.setState({news_category_id: newValue});
  }

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({tags});
  }

  handleAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({tags});
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/newses/${id}/edit.json`)
      .then(response => {
        const {title, content, news_category_id} = response.data.content.news;
        const {tags, all_tags, categories} = response.data.content;
        const {url = ''} = response.data.content.image;
        this.setState({title, content, categories, news_category_id,
          tags, all_tags, url});
      })
      .catch(error => {
        console.log(error);
      });
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
              <div className="row">
                <div className="col-md-5">
                  <input type="file" ref="image_attributes_url" name="image_attributes_url"
                    onChange={this.handleFileChange}></input>
                </div>
                <div className="col-md-7">
                  {
                    this.state.url && (
                      <div className="col-md-1">
                        <img className="preview-image" src={this.state.url}/>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminNewsesTitle)}
                </label>
                <input ref="title" name="title" type="text" className="form-control"
                  value={this.state.title} onChange={handleInputChange.bind(this)}
                  required="required"/>
              </div>
              <div className="form-group">
                <label className="control-label">
                  {formatMessage(defaultMessages.adminNewsesTags)}
                </label>
                <ReactTags
                  tags={this.state.tags}
                  suggestions={this.state.all_tags}
                  handleDelete={this.handleDelete.bind(this)}
                  handleAddition={this.handleAddition.bind(this)}/>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminNewsesCategory)}
                  </label>
                  <NewsCategory categories={this.state.categories}
                    handleChange={this.categoryInputChange.bind(this)} selected={this.state.news_category_id}/>
                </div>
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
