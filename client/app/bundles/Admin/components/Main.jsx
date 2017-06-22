import React from 'react';
import Navbar from './Navbar.jsx';
import PageWrapper from './PageWrapper.jsx';
import sbAdminCss from '../../../assets/styles/sb-admin.css';
import morrisCss from '../../../assets/styles/morris.css';
import {IntlProvider} from 'react-intl';
import {translations} from '../../../libs/i18n/translations';

export default class Main extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      certifications: []
    };
  }

  componentDidMount() {
    $.getJSON('/v1/certifications.json', (response) => { this.setState({ certifications: response }) });
  }

  render() {
    const {certifications} = this.state;
    return (
      <IntlProvider locale="vi" messages={translations} defaultLocale="vi">
        <div id="wrapper">
          <Navbar/>
          <PageWrapper certifications={certifications}/>
        </div>
      </IntlProvider>
    )
  }
}
