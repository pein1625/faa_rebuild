import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';
import Errors from '../Errors';
import Upload from '../uploads/Upload';
import ReactBoostrap from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import morrisCss from '../../../../assets/styles/mde.css';
import Courses from './Courses';
import {handleInputChange} from '../../utils/InputHandler';
import SimpleMDE from 'react-simplemde-editor';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import DayOfWeek from './DayOfWeek'
import 'rc-time-picker/assets/index.css';

const csrfToken = ReactOnRails.authenticityToken();

class CourseScheduleNew extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.courseInputChange = this.courseInputChange.bind(this);
    this.day1InputChange = this.day1InputChange.bind(this);
    this.day2InputChange = this.day2InputChange.bind(this);
    this.day3InputChange = this.day3InputChange.bind(this);

    this.state = {
      submitSuccess: false,
      errors: [],
      courses: [],
      course: null,
      start_date: "",
      end_date: "",
      deadline_date: "",
      schedule: "",
      course_id: "",
      day_of_week: "",
      day1: 0,
      start_time1: moment(),
      end_time1: moment(),
      day2: 0,
      start_time2: moment(),
      end_time2: moment(),
      day3: 0,
      start_time3: moment(),
      end_time3: moment(),
      place: "",
    };
  }

  courseInputChange(newValue) {
    this.setState({course_id: newValue});
  }

  day1InputChange(newValue) {
    this.setState({day1: newValue});
  }

  day2InputChange(newValue) {
    this.setState({day2: newValue});
  }

  day3InputChange(newValue) {
    this.setState({day3: newValue});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let id = this.props.match.params.id;

    let formData = new FormData();
    formData.append("start_date", this.state.start_date);
    formData.append("end_date", this.state.end_date);
    formData.append("deadline_date", this.state.deadline_date);
    formData.append("course_id", this.state.course_id);
    formData.append("day1", this.state.day1);
    formData.append("start_time1", this.state.start_time1);
    formData.append("end_time1", this.state.end_time1);
    formData.append("day2", this.state.day2);
    formData.append("start_time2", this.state.start_time2);
    formData.append("end_time2", this.state.end_time2);
    formData.append("day3", this.state.day3);
    formData.append("start_time3", this.state.start_time3);
    formData.append("end_time3", this.state.end_time3);
    formData.append("place", this.state.place);

    axios.post(`/v1/course_schedules/`,
      formData,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'json'
      })
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.setState({submitSuccess: true});
          $.growl.notice({message: message});
        } else {
          this.setState({errors: content});
          $.growl.error({message: message});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`/v1/course_schedules/new.json`)
      .then(response => {
        const {courses} = response.data.content;
        const {day_of_week} = response.data.content;
        const course_id = courses[0].id
        this.setState({
          courses, day_of_week, course_id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleStartDateChange(value, formattedValue) {
    this.setState({
      start_date: value
    });
  }

  handleEndDateChange(value, formattedValue) {
    this.setState({
      end_date: value
    });
  }

  handleTimeStart1Change(value, formattedValue) {
    this.setState({
      start_time1: value
    });
  }

  handleTimeEnd1Change(value, formattedValue) {
    this.setState({
      end_time1: value
    });
  }

  handleTimeStart2Change(value, formattedValue) {
    this.setState({
      start_time2: value
    });
  }

  handleTimeEnd2Change(value, formattedValue) {
    this.setState({
      end_time2: value
    });
  }

  handleTimeStart3Change(value, formattedValue) {
    this.setState({
      start_time3: value
    });
  }

  handleTimeEnd3Change(value, formattedValue) {
    this.setState({
      end_time3: value
    });
  }

  handleRegistrationDeadline(value, formattedValue) {
    this.setState({
      deadline_date: value
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    if(this.state.submitSuccess) {
      return (
        <Redirect to="/admin/course_schedules/">
        </Redirect>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-7 col-md-offset-2">
            {
              this.state.errors.length > 0 && <Errors errors={this.state.errors}/>
            }
            <form role="form" onSubmit={this.handleFormSubmit} id="edit-certification-form">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesStartDate)}
                  </label>
                  <div className="form-group">
                    <DatePicker name="start_date" value={this.state.start_date}
                      onChange={this.handleStartDateChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesEndDate)}
                  </label>
                  <div className="form-group">
                    <DatePicker value={this.state.end_date}
                      onChange={this.handleEndDateChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminCoursesDeadline)}
                  </label>
                  <div className="form-group">
                    <DatePicker value={this.state.deadline_date}
                      onChange={this.handleRegistrationDeadline.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleDay)}
                  </label>
                  <DayOfWeek dayOfWeek={this.state.day_of_week}
                    handleChange={this.day1InputChange} selected={this.state.day1}/>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeStart)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.start_time1)}
                      onChange={this.handleTimeStart1Change.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeEnd)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.end_time1)}
                      onChange={this.handleTimeEnd1Change.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleDay)}
                  </label>
                  <DayOfWeek dayOfWeek={this.state.day_of_week}
                    handleChange={this.day2InputChange} selected={this.state.day2}/>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeStart)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.start_time2)}
                      onChange={this.handleTimeStart2Change.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeEnd)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.end_time2)}
                      onChange={this.handleTimeEnd2Change.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleDay)}
                  </label>
                  <DayOfWeek dayOfWeek={this.state.day_of_week}
                    handleChange={this.day3InputChange} selected={this.state.day3}/>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeStart)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.start_time3)}
                      onChange={this.handleTimeStart3Change.bind(this)}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleTimeEnd)}
                  </label>
                  <div className="form-group">
                    <TimePicker defaultValue={moment()} showSecond={false}
                      value={moment.utc(this.state.end_time3)}
                      onChange={this.handleTimeEnd3Change.bind(this)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminScheduleCategory)}
                  </label>
                  <Courses courses={this.state.courses}
                    handleChange={this.courseInputChange} selected={this.state.course_id}/>
                </div>
                <div className="col-md-8">
                  <label className="control-label">
                    {formatMessage(defaultMessages.adminSchedulePlace)}
                  </label>
                  <input name="place" type="text" className="form-control"
                    value={this.state.place} onChange={handleInputChange.bind(this)} />
                </div>
              </div>
              <div className="form-group submit-group">
                <button type="submit" className="btn btn-primary">
                  {formatMessage(defaultMessages.adminScheduleAdd)}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default injectIntl(CourseScheduleNew);
