import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { storage } from '../Firebase/Config';

const BannerAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const [imageUpload, setImageUpload] = useState(null);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/banners/${imageUpload.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(imageRef);
      setImageUrl(downloadURL);
      toast.success("Image Uploaded Successfully");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full">
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
          <div onClick={() => navigateTo("/admin/dashboard")}>
            <NavItem icon="fa-qrcode" text="Dashboard" link="/admin/dashboard" />
          </div>
          <NavItem
            icon="fa-cart-shopping"
            text="Products"
            link=""
            subLinks={[
              { text: "All", link: "/admin/product" },
              { text: "New", link: "/admin/product/new" },
              { text: "Banner", link: "/admin/banner" },
            ]}
          />
          <div onClick={() => navigateTo("/admin/orders")}>
            <NavItem icon="fa-cart-shopping" text="Orders" link="/admin/orders" />
          </div>
          <div onClick={() => navigateTo("/admin/users")}>
            <NavItem icon="fa-users" text="Users" link="/admin/users" />
          </div>
        </div>
        
        <div className="w-full pt-3 p-4">
          <div className="text-center text-2xl font-extrabold mb-4">Images</div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col border-b-4 pb-2  md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
              <img src={`https://via.placeholder.com/100`} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover mb-4 md:mb-0 md:mr-4" />
              <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} className="border p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-auto" />
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Update</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={uploadImage} >Upload</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerAdmin;

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
