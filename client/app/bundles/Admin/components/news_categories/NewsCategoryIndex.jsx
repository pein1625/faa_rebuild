import React from 'react';
import NewsCategory from './NewsCategory';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class NewsCategoryIndex extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      news_categories: [],
    };
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleDeleted(id, message) {
    const {formatMessage} = this.props.intl;

    this.setState({
      news_categories: this.state.news_categories.filter(news_category => {
        return news_category.id !== id
      })
    });
    $.growl.notice({message: message});
  }

  componentDidMount() {
    $.getJSON('/v1/news_categories.json', (response) => {
      this.setState({ news_categories: response.content });
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminNewsCategoriesCategory)}</h2>
            <Link to="/admin/news_categories/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminNewsCategoriesNew)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                    <th>{formatMessage(defaultMessages.adminNewsCategoriesName)}</th>
                    <th>{formatMessage(defaultMessages.adminNewsCategoriesDescription)}</th>
                    <th>{formatMessage(defaultMessages.adminNewsCategoriesEdit)}</th>
                    <th>{formatMessage(defaultMessages.adminNewsCategoriesDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.news_categories.map(news_category => (
                    <NewsCategory {...news_category} key={news_category.id} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(NewsCategoryIndex);
