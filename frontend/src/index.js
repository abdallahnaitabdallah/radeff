import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter here
import App from './App';
import store from './store';
import Layout from './hocs/Layout'; // Import the Layout component

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <App />
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
