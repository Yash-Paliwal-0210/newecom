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

const DashboardAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const product = useSelector((state) => state.product);
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

  // Calculate total revenue
  const totalRevenue = () => {
    let revenue = 0;
    // Assuming revenue data is available in product or order state
    if (order && order.orders) {
      order.orders.forEach((ord) => {
        revenue += ord.amount; // Assuming amount field exists in order object
      });
    }
    return revenue;
  };

  // Calculate total transactions
  const totalTransactions = () => {
    return order && order.orders ? order.orders.length : 0;
  };

  // Calculate total products
  const totalProducts = () => {
    return product && product.product ? product.product.length : 0;
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-4 md:hidden">
        <button
          className="text-white bg-green-600 px-4 py-2 rounded"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className={`flex  flex-col p-8 gap-4  ${menuOpen ? "block" : "hidden"} md:block`}>
        <NavItem icon="fa-qrcode" text="Dashboard" link="" />
        <NavItem icon="fa-cart-shopping" text="Products" link="" subLinks={[
          { text: "All", link: "/admin/product" },
          { text: "New", link: "/admin/product/new" }
        ]} />
        <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
        <NavItem icon="fa-users" text="Users" link="/admin/users" />
        {/* <NavItem icon="fa-star" text="Review" link="/admin/review" /> */}
      </div>

      <div className="w-full p-4">
        <div className="bg-gray-400 text-2xl sm:text-4xl p-3 flex justify-center mb-4">
          Amount
        </div>

        <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0 flex-wrap">
          <DashboardButton text={`Product ${totalProducts()}`} />
          <DashboardButton text={`Order ${totalTransactions()}`} />
          <DashboardButton text={`User ${user?.users.length}`} />
        </div>

        <section className="py-10 flex flex-wrap gap-4 mt-4 justify-center items-center ">
          <WidgetItem percent={40} amount={true} value={totalRevenue()} heading="Revenue" color="rgb(0,115,255)" />
          <WidgetItem percent={-14} value={user?.users.length} heading="Users" color="rgb(0,198,202)" />
          <WidgetItem percent={80} value={totalTransactions()} heading="Transactions" color="rgb(255,196,0)" />
          <WidgetItem percent={30} value={totalProducts()} heading="Products" color="rgb(76,0,255)" />
        </section>

        <section className="graph-container mt-8 h-[200px] w-[500px] flex flex-col lg:flex-row gap-10 ">
          <div className="revenue-chart mb-8">
            <h2 className="text-center font-semibold text-2xl">Revenue & Transaction</h2>
            <BarCharts
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="gender-chart w-[300px] h-[300px] flex justify-center flex-col items-center mt-30">
            <h2 className="text-center font-bold text-3xl p-3">Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
            <p className="text-center">
              <BiMaleFemale />
            </p>
          </div>
          {/* <div className="dashboard-categories mb-8">
            <h2 className="text-center">Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))}
            </div>
          </div> */}
        </section>

        <section className="transaction-container mt-8 flex justify-center">
        </section>
      </div>
    </div>
  );
};

export default DashboardAdmin;

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
);

const DashboardButton = ({ text }) => (
  <button className="bg-gray-400 text-xl sm:text-4xl py-2 px-6 rounded mb-2 sm:mb-0">
    {text}
  </button>
);

const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
  <article className="widget p-4 border rounded shadow-sm">
    <div className="widget-info flex justify-between items-center">
      <div>
        <p className="text-lg">{heading}</p>
        <h4 className="text-2xl font-bold">{amount ? `$${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green flex items-center text-green-600">
            <HiTrendingUp /> +{percent}%
          </span>
        ) : (
          <span className="red flex items-center text-red-600">
            <HiTrendingDown /> {percent}%
          </span>
        )}
      </div>
      <div
        className="widget-circle w-16 h-16 rounded-full flex items-center justify-center text-white"
        style={{
          background: `conic-gradient(
            ${color} ${(Math.abs(percent) / 100) * 360}deg,
            rgb(255, 255, 255) 0
          )`,
        }}
      >
        <span
          className="text-lg font-bold"
          style={{
            color,
          }}
        >
          {percent}%
        </span>
      </div>
    </div>
  </article>
);

const CategoryItem = ({ color, value, heading }) => (
  <div className="category-item p-4 border rounded shadow-sm">
    <h5 className="text-lg font-bold">{heading}</h5>
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-2">
      <div
        className="h-4 rounded-full"
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span className="text-lg">{value}%</span>
  </div>
);
