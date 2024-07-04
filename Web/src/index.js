import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { TerminalContextProvider } from "react-terminal";
ReactDOM.render(
  <BrowserRouter >
    <TerminalContextProvider>
      <App />
    </TerminalContextProvider>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();