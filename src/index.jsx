import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';


import MainView from './components/main-view/main-view';


import './index.scss';

const store = configureStore({ reducer: moviesApp })

class popCorny extends React.Component {
    render() {
      return(
        <Provider store={store}>
           <Container>
             <MainView />
           </Container>
         </Provider>
       );
     }
   }

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(popCorny), container);