import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../libs/i18n/default';

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">
            {formatMessage(defaultMessages.adminPageHeaderDashboard)}
          </h1>
          <ol className="breadcrumb">
            <li className="active">
              <i className="fa fa-dashboard" />
              {formatMessage(defaultMessages.adminPageHeaderDashboard)}
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default injectIntl(PageHeader);
