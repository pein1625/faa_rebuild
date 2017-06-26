import React from 'react';
import CourseCategory from './CourseCategory';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class CourseCategoriesList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      course_categories: [],
    };
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleDeleted(id, message) {
    const {formatMessage} = this.props.intl;

    this.setState({
      course_categories: this.state.course_categories.filter(course_category => {
        return course_category.id !== id
      })
    });
    $.growl.notice({message: message});
  }

  componentDidMount() {
    $.getJSON('/v1/course_categories.json', (response) => {
      this.setState({ course_categories: response.content });
    });
  }

  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-2">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminCourseCategoriesCategory)}</h2>
            <Link to="/admin/course_categories/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminCourseCategoriesNew)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>{formatMessage(defaultMessages.adminCourseCategoriesName)}</th>
                  <th>{formatMessage(defaultMessages.adminCourseCategoriesDescription)}</th>
                  <th>{formatMessage(defaultMessages.adminCourseCategoriesEdit)}</th>
                  <th>{formatMessage(defaultMessages.adminCourseCategoriesDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.course_categories.map(course_category => (
                    <CourseCategory {...course_category} key={course_category.id} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(CourseCategoriesList);
