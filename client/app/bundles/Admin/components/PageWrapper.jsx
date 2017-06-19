import React from 'react';
import PageHeader from './PageHeader.jsx';
import CertificationList from './certifications/CertificationList';

export default class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <PageHeader/>
          <CertificationList certifications={this.props.certifications}/>
        </div>
      </div>
    );
  }
}
