import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    )
  }
}

export default App;
