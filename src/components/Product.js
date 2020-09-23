import React from 'react';
import imgUrl from '../assets/product_image_placeholder.png';

class Product extends React.Component {
  componentDidMount() {
    console.log('Product DidMount: ' + this.props.id);
  }

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <img src={imgUrl} alt="imgage"></img>
        <p>
          <span>{this.props.price}</span>
          <button
            className="btn btn-success m-2"
            onClick={() => this.props.changeState(this.props.id)}
          >
            add to cart
          </button>
        </p>
      </div>
    );
  }
}

export default Product;
