import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import ButtonAppBar from './components/ButtonAppBar';

ReactDOM.render(
  <MuiThemeProvider>
    <ButtonAppBar />
  </MuiThemeProvider>,
  document.getElementById('root')
);