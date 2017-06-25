import React from 'react';
import PageHeader from './PageHeader.jsx';
import CertificationList from './certifications/CertificationList';
import CourseList from './courses/CourseList';
import EditCourse from './courses/EditCourse';
import NewCourse from './courses/NewCourse';
import EditCertification from './certifications/EditCertification';
import NewCertification from './certifications/NewCertification';
import NewsCategoryIndex from './news_categories/NewsCategoryIndex';
import NewsCategoryEdit from './news_categories/NewsCategoryEdit';
import NewsCategoryNew from './news_categories/NewsCategoryNew';
import FeedbacksList from './feedbacks/FeedbacksList'
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
            <Route exact path="/admin/news_categories" component={NewsCategoryIndex}/>
            <Route exact path="/admin/news_categories/:id/edit" component={NewsCategoryEdit}/>
            <Route exact path="/admin/news_categories/new" component={NewsCategoryNew}/>
            <Route exact path="/admin/feedbacks" component={FeedbacksList}/>
            <Route exact path="/admin/courses" component={CourseList}/>
            <Route exact path="/admin/courses/:id/edit" component={EditCourse}/>
            <Route exact path="/admin/courses/new" component={NewCourse}/>
          </Switch>
        </div>
      </div>
    );
  }
}
