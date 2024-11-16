import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');    
ReactDOM.render(<App />, rootElement);
document.getElementById('customLink').addEventListener('click', (e) => {
    e.preventDefault(); // 기본 동작 방지
    console.log('React 앱 내부에서 링크를 처리합니다!');
});