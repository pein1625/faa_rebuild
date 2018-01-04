import React from 'react';
import PageHeader from './PageHeader.jsx';
import CourseList from './courses/CourseList';
import EditCourse from './courses/EditCourse';
import NewCourse from './courses/NewCourse';
import UserList from './users/UserList';
import EditUser from './users/EditUser';
import NewUser from './users/NewUser';
import User from './users/User';
import FeedbacksList from './feedbacks/FeedbacksList';
import NewsList from './newses/NewsList';
import EditNews from './newses/EditNews';
import NewNews from './newses/NewNews';
import RegistrationCourseIndex from './registration_courses/RegistrationCourseIndex';
import CourseScheduleList from './course_schedules/CourseScheduleList';
import CourseScheduleEdit from './course_schedules/CourseScheduleEdit';
import CourseScheduleNew from './course_schedules/CourseScheduleNew';
import TemporaryRegistrationIndex from './temporary_registrations/TemporaryRegistrationIndex';
import {Route, Switch} from 'react-router-dom';

export default class PageWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <Switch>
            <Route exact path="/admin/feedbacks" render={() => <FeedbacksList authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/courses" render={() => <CourseList authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/courses/:id/edit" render={({match}) => <EditCourse match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/courses/new" render={({match}) => <NewCourse match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/users" render={({match}) => <UserList authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/users/new" render={({match}) => <NewUser match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/users/:id/edit" render={({match}) => <EditUser match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/newses" render={() => <NewsList authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/newses/:id/edit" render={({match}) => <EditNews match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/newses/new" render={({match}) => <NewNews match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin" render={() => <CourseList authenticity_token={this.props.authenticity_token} />} />
            <Route exact path="/admin/registration_courses" render={() => <RegistrationCourseIndex authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/course_schedules" render={() => <CourseScheduleList authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/course_schedules/:id/edit" render={({match}) => <CourseScheduleEdit match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/course_schedules/new" render={({match}) => <CourseScheduleNew match={match} authenticity_token={this.props.authenticity_token} />}/>
            <Route exact path="/admin/temporary_registrations" render={() => <TemporaryRegistrationIndex authenticity_token={this.props.authenticity_token} />}/>
          </Switch>
        </div>
      </div>
    );
  }
}
