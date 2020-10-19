import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/core/styles';

import { persistor, store } from './store';
import Router from './routes';

import theme from './pages/_layouts/theme';
import GlobalStyle from './styles/globalStyle';

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
