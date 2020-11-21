import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  constructor() {
    super();

    this.addItemsToCart = this.addItemsToCart.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.state = {
      quantity: 1,
      total: 0,
      disableButton: true,
    };
  }

  increment() {
    this.setState((state) => ({
      quantity: state.quantity + 1,
      disableButton: !state.disableButton,
    }));
    // alert("+1");
  }

  decrement() {
    const { quantity } = this.state;
    if (quantity < 2) {
      this.setState((state) => ({
        quantity: 1,
        disableButton: !state.disableButton,
      }));
    } else {
      this.setState((state) => ({
        quantity: state.quantity - 1,
      }));
    }
  }

  addItemsToCart() {
    const { product, addItemCart } = this.props;
    const { title, thumbnail, price, id } = product;
    const { quantity, total } = this.state;
    console.log(quantity);
    this.setState({
      quantity,
      total: price,
    });
    console.log(quantity);
    addItemCart({ product: { title, thumbnail, price, id, quantity } });
  }

  // saveItemToCart() {
  //   const { id, price, title, thumbnail } = this.props;
  //   const { quantity } = this.state;
  //   const storageItems = JSON.parse(localStorage.getItem('Product') || '[]');
  //   const existentItem = (storageItems.find((item) => item.id === id));
  //   storageItems.push({
  //     id,
  //     title,
  //     price: parseFloat(price),
  //     thumbnail,
  //     quantity: this.state.quantity,
  //   });
  //   localStorage.setItem('Product', JSON.stringify(storageItems));
  // }

  renderPlusAndMinus() {
    const { disableButton, quantity } = this.state;
    return (
      <div className="containerPlusAndMinus">
        <h5>Quantidade</h5>
        <button type="button" onClick={ this.decrement } disableButton={ disableButton }>
          -
        </button>
        <h5>{quantity}</h5>
        <button type="button" onClick={ this.increment }>
          +
        </button>
        <div className="addToCart">
          <button
            type="button"
            className="add-button"
            data-testid="product-add-to-cart"
            onClick={ () => {
              // this.saveItemToCart();
              this.addItemsToCart();
            } }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }


  render() {
    const { product } = this.props;
    const { title, thumbnail, price, id } = product;
    return (
      <section key={ title } data-testid="product" className="product-content">
        <Link
          data-testid="product-detail-link"
          to={ { pathname: `/ProductDetails/${id}`, state: product } }
        >
          <div className="img-div">
            <img className="img" src={ thumbnail } alt={ title } />
          </div>
        </Link>
        <div className="product-details-div">
          <p>{title}</p>
          <p className="price">{`R$ ${price}`}</p>
        </div>
        { this.renderPlusAndMinus() }
      </section>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  addItemCart: PropTypes.string.isRequired,
};
export default ProductCard;
