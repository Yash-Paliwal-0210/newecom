// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FetchAllUsers } from "../Redux/User/UserReducer";
// import { FetchAllOrders } from "../Redux/Orders/OrderReducer";
// import { FetchAllProduct } from "../Redux/Products/ProductReducer";
// import { Link } from "react-router-dom";
// import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
// import data from "../Assets/data.json";
// import { BiMaleFemale } from "react-icons/bi";
// import BarCharts from "./Charts/Barcharts";
// import { DoughnutChart } from "../Components/Charts";

// const DashboardAdmin = () => {
//   const product = useSelector((state) => state.product);
//   const user = useSelector((state) => state.user);
//   const order = useSelector((state) => state.order);

//   useEffect(() => {
//     fetchUser_order();
//   }, []);

//   const dispatch = useDispatch();

//   const fetchUser_order = async () => {
//     dispatch(FetchAllUsers());
//     dispatch(FetchAllOrders());
//     dispatch(FetchAllProduct());
//   };
//   return (
//     <div>
//       <div className="flex flex-row w-full">
//         <div className="flex flex-col p-8 gap-4">
//           <div className="flex gap-2 items-center px-4">
//             <div className="w-[20px]">
//               <i class="fa-solid fa-qrcode"></i>
//             </div>
//             <div className=" font-semibold">
//               <a href="">
//                 <span className="text-2xl">Dashboard</span>
//               </a>
//             </div>
//           </div>

//           <div className="flex gap-2 items-center px-4">
//             <div className="w-[20px]">
//               <i class="fa-solid fa-cart-shopping"></i>
//             </div>
//             <div className="space-x-2 font-semibold">
//               <a href="">
//                 <span className="text-2xl">Products</span>
//               </a>
//               <div>
//                 <Link to="/admin/product">All</Link>
//               </div>
//               <div>
//                 <Link to="/admin/product/new">New</Link>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-2 items-center px-4">
//             <div className="w-[20px]">
//               {/* <i class="fa-solid fa-cart-shopping"></i> */}
//               <a href="/admin/dashboard">
//                 <svg
//                   stroke="currentColor"
//                   fill="currentColor"
//                   stroke-width="0"
//                   viewBox="0 0 16 16"
//                   height="1em"
//                   width="1em"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm8 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-4-4a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-1z"></path>
//                 </svg>
//               </a>
//             </div>
//             <div className=" font-semibold">
//               <a href="">
//                 {" "}
//                 <span className="text-2xl">Orders</span>
//               </a>
//             </div>
//           </div>
//           <div className="flex gap-2 items-center px-4">
//             <div className="w-[20px]">
//               <a href="/admin/dashboard">
//                 <svg
//                   stroke="currentColor"
//                   fill="currentColor"
//                   stroke-width="0"
//                   viewBox="0 0 448 512"
//                   height="1em"
//                   width="1em"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
//                 </svg>
//               </a>
//             </div>
//             <div className=" font-semibold">
//               <a href="">
//                 <span className="text-2xl">Users</span>
//               </a>
//             </div>
//           </div>
//           <div className="flex gap-2 items-center px-4">
//             <div className="w-[20px]">
//               <a href="/admin/dashboard">
//                 <svg
//                   stroke="currentColor"
//                   fill="currentColor"
//                   stroke-width="0"
//                   viewBox="0 0 24 24"
//                   height="1em"
//                   width="1em"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path fill="none" d="M0 0h24v24H0V0z"></path>
//                   <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9.5-2H18v-2h-5.5zm3.86-5.87c.2-.2.2-.51 0-.71l-1.77-1.77c-.2-.2-.51-.2-.71 0L6 11.53V14h2.47l5.89-5.87z"></path>
//                 </svg>
//               </a>
//             </div>
//             <div className=" font-semibold">
//               <a href="">
//                 <span className="text-2xl">Review</span>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div></div>

//         <div className="h-auto w-full">
//           <div>
//             <div className="bg-green-600 text-2xl sm:text-4xl p-3 flex justify-center mb-4">
//               Amount
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 justify-center sm:gap-0 sm:flex-row sm:justify-between px-10 w-full flex-wrap ">
//             <button className="bg-green-600  text-xl sm:text-4xl py-2  px-6 rounded ">
//               Product {product && product.product.length}
//             </button>
//             <button className="bg-green-600 text-xl sm:text-4xl p-3 rounded ">
//               Order {order && order.orders.length}
//             </button>
//             <button className="bg-green-600 text-xl sm:text-4xl p-3 rounded ">
//               User {user && user.users.length}
//             </button>
//           </div>

//           <section className="widget-container">
//             <WidgetItem
//               percent={40}
//               amount={true}
//               value={340000}
//               heading="Revenue"
//               color="rgb(0,115,255)"
//             />
//             <WidgetItem
//               percent={-14}
//               value={400}
//               heading="Users"
//               color="rgb(0 198 202)"
//             />
//             <WidgetItem
//               percent={80}
//               value={23000}
//               heading="Transactions"
//               color="rgb(255 196 0)"
//             />
//             <WidgetItem
//               percent={30}
//               value={1000}
//               heading="Products"
//               color="rgb(76 0 255)"
//             />
//           </section>

//           <section className="graph-container">
//             <div className="revenue-chart">
//               <h2>Revenue & Transaction</h2>
//               <BarCharts
//                 data_2={[300, 144, 433, 655, 237, 755, 190]}
//                 data_1={[200, 444, 343, 556, 778, 455, 990]}
//                 title_1="Revenue"
//                 title_2="Transaction"
//                 bgColor_1="rgb(0,115,255)"
//                 bgColor_2="rgba(53,162,235,0.8)"
//               />
//             </div>

//             <div className="dashboard-categories">
//               <h2>Inventory</h2>
//               <div>
//                 {data.categories.map((i) => (
//                   <CategoryItem
//                     key={i.heading}
//                     heading={i.heading}
//                     value={i.value}
//                     color={`hsl(${i.value * 4},${i.value}%,50%)`}
//                   />
//                 ))}
//               </div>
//             </div>

//           </section>

//           <section className="transaction-container">
//           <div className="gender-chart">
//             <h2>Gender Ratio</h2>

//             <DoughnutChart
//               labels={["Female", "Male"]}
//               data={[12, 19]}
//               backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
//               cutout={90}
//             />

//             <p>
//               <BiMaleFemale />
//             </p>
//           </div>

//         </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardAdmin;

// const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
//   <article className="widget">
//     <div className="widget-info">
//       <p>{heading}</p>
//       <h4>{amount ? `$${value}` : value}</h4>
//       {percent > 0 ? (
//         <span className="green">
//           <HiTrendingUp /> +{percent}%{" "}
//         </span>
//       ) : (
//         <span className="red">
//           <HiTrendingDown /> {percent}%{" "}
//         </span>
//       )}
//     </div>

//     <div
//       className="widget-circle"
//       style={{
//         background: `conic-gradient(
//         ${color} ${(Math.abs(percent) / 100) * 360}deg,
//         rgb(255, 255, 255) 0
//       )`,
//       }}
//     >
//       <span
//         style={{
//           color,
//         }}
//       >
//         {percent}%
//       </span>
//     </div>
//   </article>
// );

// const CategoryItem = ({ color, value, heading }) => (
//   <div className="category-item">
//     <h5>{heading}</h5>
//     <div>
//       <div
//         style={{
//           backgroundColor: color,
//           width: `${value}%`,
//         }}
//       ></div>
//     </div>
//     <span>{value}%</span>
//   </div>
// );

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

      <div className={`flex flex-col p-8 gap-4 w-full md:w-1/4 ${menuOpen ? "block" : "hidden"} md:block`}>
        <NavItem icon="fa-qrcode" text="Dashboard" link="" />
        <NavItem icon="fa-cart-shopping" text="Products" link="" subLinks={[
          { text: "All", link: "/admin/product" },
          { text: "New", link: "/admin/product/new" }
        ]} />
        <NavItem icon="fa-cart-shopping" text="Orders" link="" />
        <NavItem icon="fa-users" text="Users" link="" />
        <NavItem icon="fa-star" text="Review" link="" />
      </div>

      <div className="w-full md:w-3/4 p-4">
        <div className="bg-gray-400 text-2xl sm:text-4xl p-3 flex justify-center mb-4">
          Amount
        </div>

        <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-0 flex-wrap">
          <DashboardButton text={`Product ${product?.product.length}`} />
          <DashboardButton text={`Order ${order?.orders.length}`} />
          <DashboardButton text={`User ${user?.users.length}`} />
        </div>

        <section className="py-10 flex flex-wrap gap-4 mt-4 justify-center items-center ">
          <WidgetItem percent={40} amount={true} value={340000} heading="Revenue" color="rgb(0,115,255)" />
          <WidgetItem percent={-14} value={user?.users.length} heading="Users" color="rgb(0,198,202)" />
          <WidgetItem percent={80} value={23000} heading="Transactions" color="rgb(255,196,0)" />
          <WidgetItem percent={30} value={product?.product.length} heading="Products" color="rgb(76,0,255)" />
        </section>

        <section className="graph-container mt-8">
          <div className="revenue-chart mb-8">
            <h2 className="text-center">Revenue & Transaction</h2>
            <BarCharts
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)"
            />
          </div>

          <div className="dashboard-categories mb-8">
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
          </div>
        </section>

        <section className="transaction-container mt-8">
          <div className="gender-chart">
            <h2 className="text-center">Gender Ratio</h2>
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
        </section>
      </div>
    </div>
  );
};

export default DashboardAdmin;

const NavItem = ({ icon, text, link, subLinks = [] }) => (
  <div className="flex gap-2 items-center px-4">
    <div className="w-[20px]">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="space-x-2 font-semibold">
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

