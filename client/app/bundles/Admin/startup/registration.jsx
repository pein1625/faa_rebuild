import ReactOnRails from 'react-on-rails';

import { addLocaleData } from 'react-intl';
import vi from 'react-intl/locale-data/vi';
import App from '../components/App';

addLocaleData([...vi]);
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App
});
