import React from 'react';

export default class Certifications extends React.Component {
  componentDidMount() {
    $.getJSON('/v1/certifications.json', (response) => {this.setState({ certifications: response })});
  }

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      certifications: [],
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.certifications.map((certification) => (
            <li key={certification.id}>{certification.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
