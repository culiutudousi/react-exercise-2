import React from 'react';

const Header = ({ cartSum }) => (
  <div>
    <h1>Store</h1>
    <span>Sum of cart: {cartSum}</span>
  </div>
);

export default Header;
