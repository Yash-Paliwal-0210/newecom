import React, { useState, useEffect } from "react";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Config";

const AllProductAdmin = () => {
  const [editingProduct, setEditingProduct] = useState(null); // State to hold product being edited
  const [updateFormData, setUpdateFormData] = useState({
    Id: "",
    Name: "",
    Price: "",
    Stock: "",
    Category: "",
    Description: "",
  }); // State to hold form data for updating

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch_product();
  }, []);

  const fetch_product = async () => {
    dispatch(FetchAllProduct());
  };

  const delete_product = async (productId) => {
    const docRef = doc(db, "Products", productId);
    try {
      await deleteDoc(docRef);
      console.log("Product deleted successfully");
      fetch_product(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    console.log(product);
    setUpdateFormData({
      Id: product.Id,
      Name: product.Name,
      Price: product.Price,
      Stock: product.Stock,
      Category: product.Category,
      Description: product.Description,
    });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setUpdateFormData({
      Id: "",
      Name: "",
      Price: "",
      Stock: "",
      Category: "",
      Description: "",
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const { Id, Name, Price, Stock, Description, Category } = updateFormData;
    const docRef = doc(db, "Products", Id);
    try {
      await updateDoc(docRef, {
        Name: Name,
        Price: Price,
        Stock: Stock,
        Category: Category,
        Description: Description,
      });
      console.log("Product updated successfully");
      cancelEditing();
      fetch_product(); // Refresh product list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Product Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Stock</th>
            <th style={tableHeaderStyle}>Update</th>
            <th style={tableHeaderStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((prod) => (
            <tr key={prod.Id} style={tableRowStyle}>
              <td style={tableCellStyle}>{prod.Id}</td>
              <td style={tableCellStyle}>{prod.Name.substring(0, 30)}</td>
              <td style={tableCellStyle}>{prod.Price}</td>
              <td style={tableCellStyle}>{prod.Stock}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => startEditing(prod)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => delete_product(prod.Id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Form */}
      {editingProduct && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Product</h3>
          <form onSubmit={submitUpdate}>
            <label>
              Name:
              <input
                type="text"
                name="Name"
                value={updateFormData.Name}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="Price"
                value={updateFormData.Price}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <br />
            <label>
              Stock:
              <input
                type="number"
                name="Stock"
                value={updateFormData.Stock}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="Category"
                value={updateFormData.Category}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="Category"
                value={updateFormData.Description}
                onChange={handleUpdateChange}
                required
              />
            </label>
            <br />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Update
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableRowStyle = {
  backgroundColor: "white",
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "12px",
  textAlign: "left",
};

export default AllProductAdmin;
