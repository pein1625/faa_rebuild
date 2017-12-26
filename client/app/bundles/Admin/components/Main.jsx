import React from 'react';
import Navbar from './Navbar.jsx';
import PageWrapper from './PageWrapper.jsx';
import sbAdminCss from '../../../assets/styles/sb-admin.css';
import morrisCss from '../../../assets/styles/morris.css';
import {IntlProvider} from 'react-intl';
import {translations} from '../../../libs/i18n/translations';
import axios from 'axios';

export default class Main extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('/v1/courses.json', {
      headers: {'Authorization': this.props.authen}
    })
    .then(response => {
      const {courses} = response.data.content;
      this.setState({courses});
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const {courses} = this.state;
    return (
      <IntlProvider locale="vi" messages={translations} defaultLocale="vi">
        <div id="wrapper">
          <Navbar/>
          <PageWrapper courses={courses} authenticity_token={this.props.authen}/>
        </div>
      </IntlProvider>
    )
  }
}
