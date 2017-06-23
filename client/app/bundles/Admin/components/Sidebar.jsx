import React from 'react';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../libs/i18n/default';
import {Link} from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
          <li className="active">
            <Link to="/admin/certifications">
              <i className="fa fa-fw fa-dashboard" />
              {formatMessage(defaultMessages.adminSidebarDashboard)}
            </Link>
          </li>
          <li>
            <Link to="/admin/news_categories">
              <i className="fa fa-fw fa-dashboard" />
              {formatMessage(defaultMessages.adminSidebarNewsCategories)}
            </Link>
          </li>
          <li>
            <a href="tables.html">
              <i className="fa fa-fw fa-table" />
              {formatMessage(defaultMessages.adminSidebarTables)}
            </a>
          </li>
          <li>
            <a href="forms.html">
              <i className="fa fa-fw fa-edit" />
              {formatMessage(defaultMessages.adminSidebarForms)}
            </a>
          </li>
          <li>
            <a href="javascript:;" data-toggle="collapse" data-target="#demo">
              <i className="fa fa-fw fa-arrows-v" />
              {formatMessage(defaultMessages.adminSidebarDropdown)}
              <i className="fa fa-fw fa-caret-down" />
            </a>
            <ul id="demo" className="collapse">
              <li>
                <a href="#">{formatMessage(defaultMessages.adminSidebarDropdownItem)}</a>
              </li>
              <li>
                <a href="#">{formatMessage(defaultMessages.adminSidebarDropdownItem)}</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="blank-page.html">
              <i className="fa fa-fw fa-file" />
              {formatMessage(defaultMessages.adminSidebarBlankPage)}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default injectIntl(Sidebar);
