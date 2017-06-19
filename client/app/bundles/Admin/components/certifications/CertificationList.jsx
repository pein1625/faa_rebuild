import React from 'react';
import Certification from './Certification';

export default class CertificationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {
          this.props.certifications.map(certification => (
            <Certification {...certification} key={certification.id}/>
          ))
        }
      </div>
    )
  }
}
