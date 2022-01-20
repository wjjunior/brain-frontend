// import './wdyr'; // THIS IS FOR DEBUGGING ONLY
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { configStore, configTheme } from './config';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';

import pt_BR_LOCALE from './static/locales/pt_BR';

function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={configStore()}>
        <IntlProvider locale="pt-BR" messages={pt_BR_LOCALE}>
          <BrowserRouter>
            <ThemeProvider theme={configTheme()}>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// if ((module as any).hot) {
//   (module as any).hot.accept('./App', runApp);
// }

runApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
