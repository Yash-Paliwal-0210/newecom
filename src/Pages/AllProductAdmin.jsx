import React, { useState, useEffect } from "react";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";

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
  const [showForm, setShowForm] = useState(false); // State to control form visibility

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
      toast.success("Product deleted successfully");
      fetch_product(); // Refresh product list after deletion
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
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
    setShowForm(true); // Show the form when editing starts
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
    setShowForm(false); // Hide the form when editing is cancelled
    // toast.info("Editing cancelled");
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
      toast.success("Product updated successfully");
      cancelEditing();
      fetch_product(); // Refresh product list after update
    } catch (error) {
      toast.error("Error updating product: " + error.message);
      console.error("Error updating product:", error);
    }
  };

  const categories = ["all", "Ethinic", "Kurti", "Ambrella", "Nayra","Pant", "Dupatta"]; // List of categories

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [menuOpen, setMenuOpen] = useState(false);
 const navigateTo = useNavigate();
  return (
    <>
    <Navbar/>

    <div className="flex flex-col md:flex-row">

    
   

    
    {/* <div className="flex flex-col md:flex-row w-full"> */}
      <div className="p-4 md:hidden">
        <button
          className="text-white bg-green-600 px-4 py-2 rounded"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-slate-50 border-3 p-4 transition-transform duration-300 ease-in-out`}
      >
        <div onClick={()=> navigateTo("/admin/dashboard")}><NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard"  /></div>
        <NavItem
          icon="fa-cart-shopping"
          text="Products"
          link=""
          subLinks={[
            { text: "All", link: "/admin/product" },
            { text: "New", link: "/admin/product/new" },
          ]}
        />
        <div onClick={()=> navigateTo("/admin/orders")}><NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" /></div>
        <div onClick={()=> navigateTo("/admin/users")}><NavItem icon="fa-users" text="Users" link="/admin/users" /></div>
      </div>
     
      

    <div className="items-center w-full">
    <div className="flex flex-col justify-center items-center mt-4">
      <h2 className="text-center text-2xl font-bold mb-4">Product Table</h2>
      {/* <div className="overflow-x-auto">
        <table className="w-full border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Update</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <tr key={prod.Id} className="border-b border-gray-300">
                <td className="p-3">{prod.Id}</td>
                <td className="p-3">{prod.Name.substring(0, 30)}</td>
                <td className="p-3">{prod.Price}</td>
                <td className="p-3">{prod.Stock}</td>
                <td className="p-3">{prod.Category}</td>

                <td className="p-3">
                  <button
                    onClick={() => startEditing(prod)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update
                  </button>
                </td>
                <td className="p-3">
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
      </div> */}
      <div className="w-full overflow-x-auto">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">ID</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Name</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Price</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Stock</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Category</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Update</th>
        <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">Delete</th>
      </tr>
    </thead>
    <tbody>
      {product.map((prod) => (
        <tr key={prod.Id} className="border-b border-gray-300">
          <td className="p-2 sm:p-3 text-xs sm:text-sm">{prod.Id}</td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">{prod.Name.substring(0, 30)}</td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">{prod.Price}</td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">{prod.Stock}</td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">{prod.Category}</td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">
            <button
              onClick={() => startEditing(prod)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm"
            >
              Update
            </button>
          </td>
          <td className="p-2 sm:p-3 text-xs sm:text-sm">
            <button
              onClick={() => delete_product(prod.Id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Update Form */}
      {editingProduct && showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={submitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={updateFormData.Name}
                  onChange={handleUpdateChange}
                  required
                  className="block w-full border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="number"
                  name="Price"
                  value={updateFormData.Price}
                  onChange={handleUpdateChange}
                  required
                  className="block w-full border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Stock:</label>
                <input
                  type="number"
                  name="Stock"
                  value={updateFormData.Stock}
                  onChange={handleUpdateChange}
                  required
                  className="block w-full border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <select
                  name="Category"
                  value={updateFormData.Category}
                  onChange={handleUpdateChange}
                  required
                  className="block w-full border-gray-300 rounded-md p-2 mt-1"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description:</label>
                <input
                  type="text"
                  name="Description"
                  value={updateFormData.Description}
                  onChange={handleUpdateChange}
                  required
                  className="block w-full border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save Update
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
    </div>
    </div>
    
    </>
  );
};

export default AllProductAdmin;

const NavItem = ({ icon, text, link, subLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex gap-4 items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
        onClick={toggleSubMenu}
      >
        <div className="w-[20px]">
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div className="font-semibold">{text}</div>
        {subLinks.length > 0 && (
          <i
            className={`fa-solid fa-chevron-down ml-auto transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        )}
      </div>
      {isOpen && subLinks.length > 0 && (
        <div className="ml-8 mt-2 space-y-1">
          {subLinks.map((subLink, index) => (
            <div key={index}>
              <Link
                to={subLink.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 rounded"
              >
                {subLink.text}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
