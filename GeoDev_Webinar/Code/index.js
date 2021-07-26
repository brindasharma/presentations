import React from 'react';
import ReactDOM from 'react-dom';

import CalciteThemeProvider, {CalciteTheme} from 'calcite-react/CalciteThemeProvider';

import './index.css';
import App from './App';
//import Home from './Home';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const CustomTheme = {
  ...CalciteTheme,
  palette: {
    ...CalciteTheme.palette,
    blue: '#1E5D8C'
  }
};
ReactDOM.render(
  <CalciteThemeProvider  theme={CustomTheme}>
    <App />
  </CalciteThemeProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
