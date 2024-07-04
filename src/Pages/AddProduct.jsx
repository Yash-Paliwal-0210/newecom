import React, { useState } from 'react';
import { db } from '../Firebase/Config';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setcategory] = useState('');
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState('link');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation (optional)
    if (!name || !price || !description || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }
    const generatedProductId = uuidv4();

    const docData = {
      Name: name,
      Price: price,
      Description: description,
      CreatedAt: new Date(user.joinedAt.seconds * 1000).toLocaleString(),
      Rating: 5.0,
      Reviews: [],
      Category: category,
      Stock: stock,
      Id: generatedProductId.slice(0, 16),
    };

    try {
      await setDoc(doc(db, "Products", generatedProductId.slice(0, 16)), docData);
      toast.success("Operation successful!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Add New Product</h2>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">Category:</label>
          <select id="filter-category" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" value={category} onChange={(e) => setcategory(e.target.value)}>
            <option value="all">All</option>
            <option value="Ethinic">Ethinic Set</option>
            {/* <option value="clothing">Clothing</option> */}
            <option value="Tops">Tops</option>
            <option value="Kurti">Kurti Set</option>
            <option value="Ambrella">Ambrella Set</option>
            <option value="Nayra">Nayra Set</option>
            <option value="Pant">Pant</option>
            <option value="Dupatta">Dupatta</option>
            {/* <option value="BabyToys">Baby's & Toys</option> */}
            {/* <option value="Grocery">Groceries and Pets</option>
            <option value="Health">Health & Beauty</option> */}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium">Stock:</label>
          <input
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {/* <div className="flex flex-col"> */}
        {/* <label htmlFor="imageUrl" className="text-sm font-medium">Image URL:</label>
        <input
        type="url"
        id="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      /> */}
        {/* </div> */}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
