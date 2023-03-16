import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/plugin.css';
import 'antd/dist/reset.css';
import 'antd/dist/antd.js';
import 'antd/dist/antd-with-locales.js';
import './css/common.css';
import './css/layout.css';
import './css/fonts/NanumSquareNeo/fonts.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
