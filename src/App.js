import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.addItemCart = this.addItemCart.bind(this);
    this.state = {
      shoppingCart: [],
    };
  }

  addItemCart(product) {
    const { shoppingCart } = this.state;
    localStorage.setItem("product", JSON.stringify(product));
    this.setState({
      shoppingCart: shoppingCart.concat(product),
    });
    console.log(shoppingCart);
  }

  render() {
    const { shoppingCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Search addItemCart={ this.addItemCart } { ...props } /> }
          />
          <Route
            exact
            path="/ShoppingCart"
            render={
              (props) => <ShoppingCart shoppingCart={ shoppingCart } { ...props } />
            }
          />
          <Route
            exact
            path="/ProductDetails/:id"
            render={
              (props) => <ProductDetails addItemCart={ this.addItemCart } { ...props } />
            }
          />
          <Route
            exact
            path="/Checkout"
            render={
              (props) => <Checkout { ...props } />
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
