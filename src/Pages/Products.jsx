import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Config';
import ReactStars from 'react-stars';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [link, setlink] = useState();

    const [products, setProducts] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [costRange, setCostRange] = useState(10000);
    const [starRange, setStarRange] = useState(0);
    const [loading, setloading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigateTo = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    //     const filteredProducts = buffer.filter((product) => {
    //         if (event.target.value === "") {
    //             return true;
    //         } else {
    //             return product.category === event.target.value; // Filter by selected category
    //         }
    //     });
    //     setProducts(filteredProducts)
    // };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        const filteredProducts = buffer.filter((product) => {
            const matchesQuery = query === null || query.trim() === "" || product.Name.toLowerCase().includes(query.toLowerCase());
            return matchesQuery;
        });
        setProducts(filteredProducts);
        setSearchTerm(event.target.value);
    };

    const getProduct = async () => {
        const querySnapshot = await getDocs(collection(db, "Products")); // Assuming you have your query snapshot

        const productsArray = [];
        querySnapshot.forEach((doc) => {
            const productData = doc.data(); // Get the data from the document
            productsArray.push(productData);
        });
        setBuffer(productsArray);
        const category = searchParams.get('category');
        const query = searchParams.get('q');
        setSelectedCategory(category);
        // const filteredProducts = productsArray.filter((product) => {
        //     if (category === null) {
        //         return true;
        //     } else {
        //         return product.Category === category; // Filter by selected category
        //     }
        // });
        const filteredProducts = productsArray.filter((product) => {
            const matchesCategory = category === null || product.Category === category;

            const matchesQuery = query === null || query.trim() === "" || product.Name.toLowerCase().includes(query.toLowerCase());

            return matchesCategory && matchesQuery;
        });
        setProducts(filteredProducts);
        setloading(false);
    }

    // const handleCostChange = (e) => {
    //     e.preventDefault();
    //     setCostRange(e.target.value);
    //     console.log(e.target.value)
    //     const filteredProducts = buffer.filter((product) => {
    //         return parseInt(product.Price) < e.target.value;
    //     });
    //     setProducts(filteredProducts);
    // }

    // const handleRatingChange = (e) => {
    //     e.preventDefault();
    //     setStarRange(e.target.value);
    //     const filteredProducts = buffer.filter((product) => {
    //         return parseInt(product.Rating) >= e.target.value;
    //     });
    //     setProducts(filteredProducts);
    // }

    const handleFilterChange = (e) => {
        console.log(e.target.id);
        let filteredProducts = buffer;
        if (e.target.id === "filter-category") {
            setSelectedCategory(e.target.value);
            filteredProducts = filteredProducts.filter((product) => {
                if (e.target.value === "all" || e.target.value === null) {
                    return true;
                } else {
                    return product.Category === e.target.value; // Filter by selected category
                }
            });
        } else {
            // console.log(selectedCategory)
            filteredProducts = filteredProducts.filter((product) => {
                if (selectedCategory === "all" || selectedCategory === null) {
                    return true;
                } else {
                    return product.Category === selectedCategory; // Filter by selected category
                }
            });
        }
        console.log(filteredProducts);
        if (e.target.id === "price-range-slider") {
            e.preventDefault();
            setCostRange(e.target.value);
            // console.log(e.target.value)
            filteredProducts = filteredProducts.filter((product) => {
                // console.log(parseInt(product.Price)+"  "+e.target.value);
                return parseInt(product.Price) < e.target.value;
            });
        } else {
            filteredProducts = filteredProducts.filter((product) => {
                // console.log(parseInt(product.Price)+"  "+e.target.value);
                return parseInt(product.Price) < costRange;
            });
        }
        console.log(filteredProducts);
        if (e.target.id === "rating-slider") {
            e.preventDefault();
            setStarRange(e.target.value);
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Rating) >= e.target.value;
            });
            setProducts(filteredProducts);
        } else {
            filteredProducts = filteredProducts.filter((product) => {
                return parseInt(product.Rating) >= starRange;
            });
            setProducts(filteredProducts);
        }
        console.log(filteredProducts);
        setProducts(filteredProducts);
    }

    return (
        <>
            {
                loading ? (
                    <div><div class="loader">
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                        <div class="loader-square"></div>
                    </div></div >
                ) : (
                    <div className='cards flex-wrap mx-32 py-6 flex-row flex gap-10 justify-center'>
                        <div className="container flex-wrap">
                            <h1 className="text-3xl font-bold mb-4">Products</h1>

                            <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <label for="filter-category" className="mr-2 text-sm font-medium">Category:</label>
                                    <select id="filter-category" className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" value={selectedCategory} onChange={handleFilterChange}>
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
                                <div className="flex items-center">
                                    <label for="filter-price" className="mr-2 text-sm font-medium">Price:</label>
                                    <div id="price-filter" className="flex items-center">
                                        <input type="range" id="price-range-slider" className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2" value={costRange} onInput={handleFilterChange} min="0" max="10000" />
                                        <span className="ml-2 text-sm">Price Range: $ {costRange}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label for="filter-price" className="mr-2 text-sm font-medium">Ratings:</label>
                                    <div id="price-filter" className="flex items-center">
                                        <input type="range" id="rating-slider" className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 h-2" value={starRange} onInput={handleFilterChange} min="0" max="5" />
                                        <span className="ml-2 text-sm">Ratings: {starRange}</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <label for="filter-search" className="mr-2 text-sm font-medium">Search:</label>

                                    <input type="text" id="filter-search" onChange={handleSearchChange} value={searchTerm} className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    {/* <input onChange={(e)=>setlink(e.target.value)} value={link} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="What are you looking for?" required /> */}

                                    <button type="submit" onClick={() => link && navigateTo(`/product?q=${link}`)} className="p-2.5 ms-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row justify-center flex-wrap gap-4">
                                {products.map((product) => (
                                    <Product key={product.id} doc={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

const Product = ({ doc }) => {
    const handleAddToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = existingItem.quantity + 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert(`${product.Name} Added Successfully`);
    };
    return (
        <div id={doc} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "280px" }}>
            <a href="#">
                <img className="p-3 rounded-t-lg" src={"https://picsum.photos/300/300"} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{doc.Name}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <ReactStars half={true} edit={false} value={doc.Rating} count={5} size={24} color2={'#ffd700'} />
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{doc.Rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${doc.Price}</span>
                    <button onClick={() => handleAddToCart(doc)}><a href="#" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-600">Add to cart</a></button>
                </div>
            </div>
        </div>
    );
};

export default Products;
