import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = ({ handleOrderPopup }) => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParam = searchQuery
          ? `?where[title][contains]=${encodeURIComponent(searchQuery)}`
          : "";
        const response = await fetch(
          `http://localhost:3000/api/products${queryParam}`
        );
        const data = await response.json();

        // Map the API response to the desired format
        const formattedData = data.docs.map((product) => ({
          id: product.id,
          title: product.title,
          image: `http://localhost:3000${product.image.url}`, // Adjusting to include the base URL
          description: product.description,
          price: `${product.price.toLocaleString()}₫`, // Format price with thousands separator
        }));

        setProductsData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]); // Refetch when searchQuery changes

  return (
    <div className="bg-gray-100 py-8">
      <div className="container py-14">
        <h1 className="text-3xl font-bold text-center pb-10">
          Sản Phẩm Của Chúng Tôi
        </h1>

        {/* Search Input */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="px-4 py-2 border rounded-md w-full max-w-[400px] shadow-sm"
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productsData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[100px] mb-4 hover:rotate-12 hover:scale-110 duration-300"
              />
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <p className="text-center text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-semibold text-gray-800">{item.price}</p>
                <button
                  onClick={handleOrderPopup}
                  className="!mt-5 border-2 border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white duration-200"
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
