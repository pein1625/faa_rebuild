import React from 'react';
import NavbarHeader from './NavbarHeader.jsx';
import NavbarRight from './NavbarRight.jsx';
import Sidebar from './Sidebar.jsx';

export default class Navbar extends React.Component {

  constructor(props, _railsContext) {
    super(props);
  }

  render() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <NavbarHeader/>
        <NavbarRight/>
        <Sidebar/>
      </div>
    );
  }
}
