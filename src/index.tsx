import React from 'react';
import ReactDOM from 'react-dom/client';

import 'antd/dist/reset.css';
import './css/common.css';
import './css/layout.css';
import './css/fonts/NanumSquareNeo/fonts.css';
import './css/plugin.css';
import './images/img-login-object.jpg';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
