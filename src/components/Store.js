import React from 'react';
import Header from './Header';
import Product from './Product';

const url = 'http://localhost:3000/products';
const splitByCategory = (data) => {
  let splitedData = {};
  let id = 0;
  data.forEach((product) => {
    if (!(product.category in splitedData)) {
      splitedData[product.category] = [];
    }
    splitedData[product.category].push({
      id: id++,
      name: product.name,
      price: product.price,
      added: false,
    });
  });
  console.log(splitedData);
  return splitedData;
};

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      cartCount: 0,
    };
  }

  componentDidMount() {
    console.log('Store DidMount');
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: splitByCategory(json),
          cartCount: 0,
        });
        console.log('Store DidMount: ', splitByCategory(json));
      });
  }

  handleStateChange = (id) => {
    let updatedCartCount = this.state.cartCount;
    const updatedData = Object.keys(this.state.data).map((category) =>
      this.state.data[category].map((product) => {
        if (product.id !== id) {
          return product;
        }
        if (product.added) {
          updatedCartCount -= 1;
        } else {
          updatedCartCount += 1;
        }
        return {
          id: id,
          name: product.name,
          price: product.price,
          added: !product.added,
        };
      })
    );
    this.setState({
      data: updatedData,
      cartCount: updatedCartCount,
    });
  };

  render() {
    console.log('Store render');
    return (
      <div>
        <Header cartSum={this.state.cartCount} />
        {Object.keys(this.state.data).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div>
              {this.state.data[category].map((product) => (
                <Product
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  added={product.added}
                  key={product.id}
                  changeState={this.handleStateChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Store;
