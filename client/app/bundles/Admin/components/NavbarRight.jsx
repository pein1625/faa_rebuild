import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../libs/i18n/default';

class NavbarRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <ul className="nav navbar-right top-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-user"/>{formatMessage(defaultMessages.adminNavbarRightUser)}<b className="caret"/>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="#"><i className="fa fa-fw fa-user"/>{formatMessage(defaultMessages.adminNavbarRightProfile)}</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-envelope"/>{formatMessage(defaultMessages.adminNavbarRightInbox)}</a>
            </li>
            <li>
              <a href="#"><i className="fa fa-fw fa-gear"/>{formatMessage(defaultMessages.adminNavbarRightSettings)}</a>
            </li>
            <li className="divider"/>
            <li>
              <a href="#"><i className="fa fa-fw fa-power-off"/>{formatMessage(defaultMessages.adminNavbarRightLogout)}</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}
export default injectIntl(NavbarRight);
