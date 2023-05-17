import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import './component/Component.css'
import Header from './component/Header';
import Main from './component/Main';
import Footer from './component/Footer';

function App() {
  return (
    <div id='app_root'>
      <Header />
      <Main />
      <Footer />
    </div>   
  );
}

export default App;
