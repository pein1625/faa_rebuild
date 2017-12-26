import React from 'react';
import News from './News';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Pagination from '../../utils/Pagination';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

class NewsList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      newses: [],
      page: 1,
      pages: 0
    };
    this.handleDeleted = this.handleDeleted.bind(this);
    this.getDataFromApi = this.getDataFromApi.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleDeleted(id) {
    const {formatMessage} = this.props.intl;

    this.setState({
      newses: this.state.newses.filter(news => {
        return news.id !== id;
      })
    });
    $.growl.notice({message: formatMessage(defaultMessages.adminCoursesDeleteSuccess)});
  }

  componentDidMount() {
    this.getDataFromApi(this.state.page);
  }

  getDataFromApi(page) {
    axios.get('/v1/newses.json', {
      headers: {'Authorization': this.props.authenticity_token},
      params: {
        page: page
      }
    })
    .then(response => {
      const {newses, page, pages} = response.data.content;
      this.setState({newses, page, pages});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChangePage(page) {
    this.getDataFromApi(page);
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminNewsesNews)}</h2>
            <Link to="/admin/newses/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminNewsesAdd)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                    <th>{formatMessage(defaultMessages.adminNewsesTitle)}</th>
                    <th>{formatMessage(defaultMessages.adminNewsesEdit)}</th>
                    <th>{formatMessage(defaultMessages.adminNewsesDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.newses.map(news => (
                    <News {...news} key={news.id} authenticity_token={this.props.authenticity_token} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
          <Pagination page={this.state.page}
            pages={this.state.pages}
            handleChangePage={this.handleChangePage} />
        </div>
      </div>
    );
  }
}

export default injectIntl(NewsList);
