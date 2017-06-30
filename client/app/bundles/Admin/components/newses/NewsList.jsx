import React from 'react';
import News from './News';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class NewsList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      newses: [],
    };
    this.handleDeleted = this.handleDeleted.bind(this);
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
    $.getJSON('/v1/newses.json', (response) => {
      this.setState({newses: response.content});
    });
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
                    <News {...news} key={news.id} handleDeleted={this.handleDeleted}/>
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

export default injectIntl(NewsList);
