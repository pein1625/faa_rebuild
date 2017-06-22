import React from 'react';
import PageHeader from './PageHeader.jsx';
import CertificationList from './certifications/CertificationList';
import EditCertification from './certifications/EditCertification';
import NewCertification from './certifications/NewCertification';
import {Route, Switch} from 'react-router-dom';

export default class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <PageHeader/>
          <Switch>
            <Route exact path="/admin/certifications" component={CertificationList}/>
            <Route path="/admin/certifications/:id/edit" component={EditCertification}/>
            <Route exact path="/admin/certifications/new" component={NewCertification}/>
          </Switch>
        </div>
      </div>
    );
  }
}
