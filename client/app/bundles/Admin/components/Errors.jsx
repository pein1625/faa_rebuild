import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../libs/i18n/default';

class Errors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">{formatMessage(defaultMessages.adminErrors)}</h3>
        </div>
        <div className="panel-body">
          {
            this.props.errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(Errors);
