import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../libs/i18n/default';

class SearchForm extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var self = this;
    $.ajax({
      url: self.props.search_url,
      data: { query: query },
      success: function(data) {
        self.props.handleSearch(data.content, query);
      },
      error: function(xhr, status, error) {
        alert('Search error: ', status, xhr, error);
      }
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    return(
      <input onChange={this.handleSearch}
        type="text"
        className="form-control"
        placeholder={formatMessage(defaultMessages.adminSearchHolder)}
        ref="query" />
    )
  }
}

export default injectIntl(SearchForm);
