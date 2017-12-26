import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main.jsx';
import {Provider} from 'react-redux';

class App extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Main authen={this.props.authenticity_token}/>
      </BrowserRouter>
    );
  }
}

export default App;
