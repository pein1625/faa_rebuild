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
            <Route exact path="/admin/feedbacks" component={FeedbacksList}/>
            <Route exact path="/admin/courses" component={CourseList}/>
            <Route exact path="/admin/courses/:id/edit" component={EditCourse}/>
            <Route exact path="/admin/courses/new" component={NewCourse}/>
            <Route exact path="/admin/users" component={UserList}/>
            <Route exact path="/admin/users/new" component={NewUser}/>
            <Route path="/admin/users/:id/edit" component={EditUser}/>
            <Route exact path="/admin/newses" component={NewsList}/>
            <Route exact path="/admin/newses/:id/edit" component={EditNews}/>
            <Route exact path="/admin/newses/new" component={NewNews}/>
            <Route exact path="/admin" component={CourseList}/>
            <Route exact path="/admin/registration_courses" component={RegistrationCourseIndex}/>
            <Route exact path="/admin/course_schedules" component={CourseScheduleList}/>
            <Route exact path="/admin/course_schedules/:id/edit" component={CourseScheduleEdit}/>
            <Route exact path="/admin/course_schedules/new" component={CourseScheduleNew}/>
            <Route exact path="/admin/temporary_registrations" component={TemporaryRegistrationIndex}/>
          </Switch>
        </div>
      </div>
    );
  }
}
