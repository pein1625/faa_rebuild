import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

const csrfToken = ReactOnRails.authenticityToken();

export default class User extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
  }

  onDeleteHandle(e) {
    let {id} = this.props;
    if (confirm("Delete the item?") == true) {
      axios.delete(`/v1/users/${id}.json`, {
        headers: {'Authorization': this.props.authenticity_token},
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
    const {name, role, id, display_order, position} = this.props;
    return (
      <tr className="active">
        <td className="col-md-4">{name}</td>
        <td className="col-md-1">{role}</td>
        <td className="col-md-3">{position}</td>
        <td className="col-md-2">{display_order}</td>
        <td>
          <Link to={`/admin/users/${id}/edit`}>
            <button className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          </Link>
        </td>
        <td>
          <a href="#"  className="btn btn-danger" onClick={this.onDeleteHandle}><i className="fa fa-times" aria-hidden="true"></i></a>
        </td>
      </tr>
    );
  }
}
