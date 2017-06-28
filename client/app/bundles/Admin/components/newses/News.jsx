import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

const csrfToken = ReactOnRails.authenticityToken();

export default class News extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
  }

  onDeleteHandle(e) {
    let {id} = this.props;
    axios.delete(`/v1/newses/${id}.json`, null,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'json'
      }
    )
    .then((response) => {
      const {status, message, content} = response.data;
      if(status === 200) {
        this.props.handleDeleted(content.id);
      } else {
        $.growl.error({message: message});
      }
    });
  }

  render() {
    const {title, id} = this.props;
    return (
      <tr className="active">
        <td className="col-md-10">{title}</td>
        <td>
          <Link to={`/admin/newses/${id}/edit`}>
            <button className="btn btn-warning"><i className="fa fa-pencil-square-o"
              aria-hidden="true"></i></button>
          </Link>
        </td>
        <td>
          <a className="btn btn-danger" onClick={this.onDeleteHandle.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </td>
      </tr>
    );
  }
}
