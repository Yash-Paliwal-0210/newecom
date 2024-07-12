import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../Redux/User/UserReducer";
import { FetchAllOrders } from "../Redux/Orders/OrderReducer";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { Link } from "react-router-dom";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import data from "../Assets/data.json";
import { BiMaleFemale } from "react-icons/bi";
import BarCharts from "./Charts/Barcharts";
import { DoughnutChart } from "../Components/Charts";

const UsersAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className='flex'>
    <div className={`flex flex-col p-8 gap-4 w-full md:w-1/4 ${menuOpen ? "block" : "hidden"} md:block`}>
        <NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" />
        <NavItem icon="fa-cart-shopping" text="Products" link="" subLinks={[
          { text: "All", link: "/admin/product" },
          { text: "New", link: "/admin/product/new" }
        ]} />
        <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
        <NavItem icon="fa-users" text="Users" link="/admin/users" />
        {/* <NavItem icon="fa-star" text="Review" link="/admin/review" /> */}
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

const NavItem = ({ icon, text, link, subLinks = [] }) => (
  <div className="flex gap-4 items-center px-4 mb-4">
    <div className="w-[20px]">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="space-x-2 font-semibold mb-2">
      <a href={link}>
        <span className="text-2xl">{text}</span>
      </a>
      {subLinks.length > 0 && subLinks.map((subLink, index) => (
        <div key={index}>
          <Link to={subLink.link}>{subLink.text}</Link>
        </div>
      ))}
    </div>
  </div>
)
    
