import React, { Component } from 'react';
import './App.css';

import Table from './Components/Table';
import Header from './Components/Header';

import BeerAPI from './Models/BeerAPI';

export default class App extends Component {
  constructor ( props ) {
    super( props );
    this.beerAPI = new BeerAPI();
    this.state = {
      beerList: []
    }
    this.beerAPI.getAllData().then( e => this.setState( { beerList: e } ) );
  }


  render() {
    const { beerList } = this.state;

    return (
      <div className="App">
        <Header/>
        <section className="table">
          <h1 id='title'>Beers!</h1>
          <div className="table-wrapper">
            <Table beerList={ beerList }></Table>
          </div>
        </section>
      </div>
  );
  }
  
}
