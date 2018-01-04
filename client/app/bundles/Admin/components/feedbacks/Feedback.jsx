import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

const csrfToken = ReactOnRails.authenticityToken();

export default class Feedback extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
  }

  onDeleteHandle(e) {
    let {id} = this.props;
    if (confirm("Delete the item?") == true) {
      axios.delete(`/v1/feedbacks/${id}.json`, {
        headers: {'Authorization': this.props.authenticity_token}
      },
        {
          responseType: 'json'
        }
      )
      .then((response) => {
        const {status, message, content} = response.data;
        if(status === 200) {
          this.props.handleDeleted(response.data.content.id);
        } else {
          $.growl.error({message: message});
        }
      });
    }
  }

  render() {
    const {name, email, subject, content, phone, id, created_at} = this.props;
    {
      var localDate = new Date(created_at);
      var localDateString = localDate.toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return (
      <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{subject}</td>
        <td>{content}</td>
        <td>{localDateString}</td>
        <td>
          <a href="#" className="btn btn-danger" onClick={this.onDeleteHandle}>
            <i className="fa fa-times" aria-hidden="true"></i></a>
        </td>
      </tr>
    );
  }
}
