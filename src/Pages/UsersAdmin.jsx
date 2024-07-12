import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../Redux/User/UserReducer";
import { FetchAllOrders } from "../Redux/Orders/OrderReducer";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { Link, useNavigate } from "react-router-dom";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import data from "../Assets/data.json";
import { BiMaleFemale } from "react-icons/bi";
import BarCharts from "./Charts/Barcharts";
import { DoughnutChart } from "../Components/Charts";

const UsersAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();

  const product = useSelector((state) => state.product.product);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    fetchUser_order();
  }, []);

  const dispatch = useDispatch();

  const fetchUser_order = async () => {
    dispatch(FetchAllUsers());
    dispatch(FetchAllOrders());
    dispatch(FetchAllProduct());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-4 md:hidden">
        <button
          className="text-white bg-green-600 px-4 py-2 rounded"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>
      </div>
    <div className='flex md:flex-row flex-col'>
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
              <div>


              </div>
              <div className='w-full shadow-md sm:rounded-lg'>
  <div className='text-4xl text-center py-4 font-semibold'>Users</div>
<div class="w-full shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" class="px-6 py-3">
                  Product Id
              </th>
              <th scope="col" class="px-6 py-3">
                  Name
              </th>
              <th scope="col" class="px-6 py-3">
                  Email
              </th>
              <th scope="col" class="px-6 py-3">
                  Role
              </th>
              <th scope="col" class="px-6 py-3">
                  Actions
              </th>
          </tr>
      </thead>
      <tbody>
        
      {product.map((prod) => (
              <tr key={prod.Id} className="border-b border-gray-300">
                <td className="p-3">{prod.Id}</td>
                <td className="p-3">{prod.Name.substring(0, 30)}</td>
                <td className="p-3">{prod.Price}</td>
                <td className="p-3">{prod.Stock}</td>
              </tr>
            ))}
      </tbody>
  </table>
</div>
              </div>

  </div>
    </>
  )
}

export default UsersAdmin

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

    
