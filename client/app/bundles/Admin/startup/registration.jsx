import ReactOnRails from 'react-on-rails';

import { addLocaleData } from 'react-intl';
import vi from 'react-intl/locale-data/vi';
import Certifications from '../components/Certifications';
import Main from '../components/Main';

addLocaleData([...vi]);
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Certifications, Main
});
