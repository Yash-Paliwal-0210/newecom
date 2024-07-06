import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.Id === product.Id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.Id !== productId));
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item.Id !== productId)));
  };

  const handleChangeQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.Id === productId ? { ...item, quantity } : item
      )
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems.map((item) =>
      item.Id === productId ? { ...item, quantity } : item
    )));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(cart);
    console.log(cart);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>
      {(!cartItems || cartItems.length === 0) ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems.map((item, count) => (
            <li key={count} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 flex items-center">
                <img src="https://via.placeholder.com/150" alt={item.Name} className="w-20 h-20 rounded object-cover mr-4" />
                <div className="flex-grow">
                  <Link to={`/product/${item.Id}`} className="text-lg font-medium hover:text-blue-500">
                    {item.Name}
                  </Link>
                  <span className="block text-gray-500 text-sm mt-1">${item.Price}</span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t">
                <div className="flex items-center">
                  <button
                    onClick={() => handleChangeQuantity(item.Id, item.quantity - 1)}
                    className="border px-3 rounded-full text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleChangeQuantity(item.Id, item.quantity + 1)}
                    className="border px-3 rounded-full text-gray-500 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveFromCart(item.Id)} className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems && cartItems.length > 0 && (
        <div className="cart-summary mt-8 bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-bold">Total: ${calculateTotalPrice().toFixed(2)}</p>
          <Link to="/Checkout" className="block mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
