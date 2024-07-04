// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // For navigation

// // Assuming you have a product data structure and a way to fetch it
// const products = [
//   // ... your product data (id, name, price, etc.)
// ];

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   // Function to handle adding items to the cart (replace with actual logic)
//   const handleAddToCart = (product) => {
//     const existingItem = cartItems.find((item) => item.id === product.id);
//     if (existingItem) {
//       setCartItems(
//         cartItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }
//   };

//   // Function to remove an item from the cart
//   const handleRemoveFromCart = (productId) => {
//     setCartItems(cartItems.filter((item) => item.id !== productId));
//   };

//   // Function to update item quantity
//   const handleChangeQuantity = (productId, quantity) => {
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   // Calculate total cart price (replace with your logic)
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   // Load cart items from local storage (optional)
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cartItems');
//     console.log(JSON.parse(storedCart));
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   // Save cart items to local storage on change (optional)
// //   useEffect(() => {
// //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
// //   }, [cartItems]);

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {cartItems.map((item,count) => (
//             <li key={count} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
//               <div className="flex items-center mb-4">
//                 <img src="..." alt={item.Name} className="w-20 h-20 rounded object-cover mr-4" />
//                 <div className="flex-grow">
//                   <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-blue-500">
//                     {item.Name}
//                   </Link>
//                   <span className="text-gray-500 text-sm mt-2">
//                     ${item.Price}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
//                     className="border px-2 rounded-full text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleChangeQuantity(item.id, e.target.value)}
//                     className="w-10 text-center border px-3 rounded-full focus:outline-none"
//                   />
//                   <button
//                     onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
//                     className="border px-2 rounded-full text-gray-500 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                   >
//                     +
//                   </button>
//                 </div>
//                   <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//                 </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cartItems.length > 0 && (
//         <div className="cart-summary">
//           {/* <p>Subtotal: ${calculateTotalPrice().toFixed(2)}</p> */}
//           <Link to="/checkout">Proceed to Checkout</Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.Id !== productId));
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item.Id !== productId)))
  };

  // Function to update item quantity
  const handleChangeQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.Id === productId ? { ...item, quantity } : item
      )
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems.map((item) =>
      item.Id === productId ? { ...item, quantity } : item
    )))

  };

  // Calculate total cart price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  useEffect(() => {
    // Assuming you have a way to fetch product data from an API or database
    // Here, we're just setting the initial cart items using the products array
    let cart = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(cart);
    console.log(cart)

  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Your Shopping Cart</h2>
      {!cartItems ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems && cartItems.map((item, count) => (

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

