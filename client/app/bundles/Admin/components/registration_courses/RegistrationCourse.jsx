import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
const csrfToken = ReactOnRails.authenticityToken();
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class RegistrationCourse extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
    this.onClickAccept = this.onClickAccept.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
  }

  onDeleteHandle() {
    let {id} = this.props;
    axios.delete(`/v1/registration_courses/${id}.json`, null,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'JSON'
      }
    )
    .then((response) => {
      const {status, message, content} = response.data;
      if(status === 200) {
        this.props.handleDeleted(content.id, message);
      } else {
        $.growl.error({message: message});
      }
    });
  }

  onClickAccept() {
    this.props.changeStatusHandle({showModal: true, id_register: this.props.id,
      status: 1});
  }

  onClickReject() {
    this.props.changeStatusHandle({showModal: true, id_register: this.props.id,
      status: 2});
  }

  render() {
    const {formatMessage} = this.props.intl;

    const {name, email, phone, address, status, course, id} = this.props;
    return (
      <tr className="active">
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{address}</td>
        <td>{course.name}</td>
        <td>
          {
            status == "pending" &&
              <div style={{display: 'flex'}}>
                <button className="btn btn-success" onClick={this.onClickAccept}
                  style={{marginRight: 5}}>
                  {formatMessage(defaultMessages.adminRegistrationCoursesAccept)}
                </button>
                <button className="btn btn-danger" onClick={this.onClickReject}>
                  {formatMessage(defaultMessages.adminRegistrationCoursesReject)}
                </button>
              </div>
          }
          {
            status == "contacted" &&
              <div>
                <p className="text-success">{formatMessage(defaultMessages.adminRegistrationCoursesContacted)}</p>
              </div>
          }
          {
            status == "rejected" &&
              <div>
                <p className="text-danger">{formatMessage(defaultMessages.adminRegistrationCoursesRejected)}</p>
              </div>
          }
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.onDeleteHandle}><i className="fa fa-times" aria-hidden="true"></i></button>
        </td>
      </tr>
    );
  }
}

export default injectIntl(RegistrationCourse);
