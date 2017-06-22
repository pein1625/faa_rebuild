import React from 'react';
import Certification from './Certification';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class CertificationList extends React.Component {

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      certifications: [],
    };
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleDeleted(id) {
    const {formatMessage} = this.props.intl;

    this.setState({
      certifications: this.state.certifications.filter(certification => {
        return certification.id !== id
      })
    });
    $.growl.notice({message: formatMessage(defaultMessages.adminCertificationsDeleteSuccess)});
  }

  componentDidMount() {
    $.getJSON('/v1/certifications.json', (response) => {
      this.setState({ certifications: response.content });
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-9 col-md-offset-2">
          <div className="certifications-table-header">
            <h2>{formatMessage(defaultMessages.adminCertificationsCertifications)}</h2>
            <Link to="/admin/certifications/new">
              <button className="btn btn-success">
                {formatMessage(defaultMessages.adminCertificationsNew)}
              </button>
            </Link>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                    <th>{formatMessage(defaultMessages.adminCertificationsName)}</th>
                    <th>{formatMessage(defaultMessages.adminCertificationsDescription)}</th>
                    <th>{formatMessage(defaultMessages.adminCertificationsEdit)}</th>
                    <th>{formatMessage(defaultMessages.adminCertificationsDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.certifications.map(certification => (
                    <Certification {...certification} key={certification.id} handleDeleted={this.handleDeleted}/>
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

export default injectIntl(CertificationList);
