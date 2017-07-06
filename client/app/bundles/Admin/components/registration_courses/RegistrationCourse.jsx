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

  render() {
    const {formatMessage} = this.props.intl;
    const {name, email, phone, address, course, id} = this.props;
    return (
      <tr className="active">
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{address}</td>
        <td>{course.name}</td>
        <td>
          <button className="btn btn-danger" onClick={this.onDeleteHandle}><i className="fa fa-times" aria-hidden="true"></i></button>
        </td>
      </tr>
    );
  }
}

export default injectIntl(RegistrationCourse);
