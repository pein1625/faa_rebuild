import React from 'react';

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, description} = this.props;

    return (
      <div className="col-lg-3 col-md-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-3">
                <i className="fa fa-comments fa-5x" />
              </div>
              <div className="col-xs-9 text-right">
                <div className="huge">26</div>
                <div>{name}</div>
              </div>
            </div>
          </div>
          <a href="#">
            <div className="panel-footer">
              <span className="pull-left">{description}</span>
              <span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
              <div className="clearfix" />
            </div>
          </a>
        </div>
      </div>
    );
  }
}
