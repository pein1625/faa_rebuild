import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';

const csrfToken = ReactOnRails.authenticityToken();

export default class CourseCategory extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
  }

  onDeleteHandle(e) {
    let {id} = this.props;
    axios.delete(`/v1/course_categories/${id}.json`, null,
      {
        headers: {'X-CSRF-Token': csrfToken},
        responseType: 'json'
      }
    )
    .then((response) => {
      const {status, message, content} = response.data;
      if(status === 200) {
        this.props.handleDeleted(response.data.content.id, message);
      } else {
        $.growl.error({message: message});
      }
    });
  }

  render() {
    const {name, description, id} = this.props;
    return (
      <tr className="active">
        <td className="col-md-4">{name}</td>
        <td className="col-md-5">{description}</td>
        <td>
          <Link to={`/admin/course_categories/${id}/edit`}>
            <button className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          </Link>
        </td>
        <td>
          <a href="#" className="btn btn-danger" onClick={this.onDeleteHandle}><i className="fa fa-times" aria-hidden="true"></i></a>
        </td>
      </tr>
    );
  }
}
