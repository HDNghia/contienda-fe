import React, {useEffect, useState} from "react";
import P1 from "../../assets/fanta1.png";
import P2 from "../../assets/fanta2.png";
import P3 from "../../assets/fanta3.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  };
};

// const productsData = [
//   {
//     id: 1,
//     title: "Fanta Cam",
//     image: P1,
//     description: "Fanta Cam với hương vị thơm ngon, tươi mát. Thích hợp để giải khát.",
//     price: "40.000₫",
//     delay: 0.5,
//   },
//   {
//     id: 2,
//     title: "Fanta Chanh",
//     description: "Fanta Chanh mang đến sự sảng khoái với hương vị chanh tự nhiên.",
//     image: P2,
//     price: "60.000₫",
//     delay: 0.8,
//   },
//   {
//     id: 3,
//     title: "Cola Không Đường",
//     description: "Cola Không Đường là sự lựa chọn hoàn hảo cho người yêu thích vị cola truyền thống mà không sợ đường.",
//     image: P3,
//     price: "70.000₫",
//     delay: 1.1,
//   },
// ];

const Products = ({ handleOrderPopup }) => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/globals/product-recommend?depth=1&draft=false&locale=undefined"
        );
        const data = await response.json();

        // Map the API response to the desired format
        const formattedData = [
          {
            id: data.product_1.id,
            title: data.product_1.title,
            image: `http://localhost:3000${data.image_1.url}`, // Assuming URL needs to be used as an image source
            description: data.product_1.description,
            price: `${data.product_1.price}`,
            delay: 0.5,
          },
          {
            id: data.product_2.id,
            title: data.product_2.title,
            image: `http://localhost:3000${data.image_2.url}`,
            description: data.product_2.description,
            price: `${data.product_2.price}`,
            delay: 0.8,
          },
          {
            id: data.product_3.id,
            title: data.product_3.title,
            image: `http://localhost:3000${data.image_3.url}`,
            description: data.product_3.description,
            price: `${data.product_3.price}`,
            delay: 1.1,
          },
        ];

        setProductsData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="container py-14">
        <motion.h1
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          className="text-3xl font-bold text-center pb-10"
        >
          Sản Phẩm Của Chúng Tôi
        </motion.h1>
        {/* Phần các thẻ sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productsData.map((item) => (
            <motion.div
              variants={fadeUp(item.delay)}
              key={item.id}
              initial="hidden"
              whileInView={"show"}
              className="flex flex-col items-center justify-center p-5 max-w-[300px] mx-auto shadow-lg rounded-xl bg-white"
            >
              <img
                src={item.image}
                alt=""
                className="w-[100px] mb-4 hover:rotate-12 hover:scale-110 duration-300"
              />
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold font-handwriting text-center">
                  {item.title}
                </h1>
                <p className="text-center text-sm text-gray-600">{item.description}</p>
                <p className="text-lg font-semibold text-gray-800">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                <button
                  onClick={() => handleOrderPopup()}
                  className="!mt-5 border-2 border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white duration-200"
                >
                  Đặt Ngay
                </button>
              </div>
            </motion.div>
          ))}

          {/* Nút Xem Tất Cả */}
          <motion.div
            variants={fadeUp(0.8)}
            initial="hidden"
            whileInView="show"
            className="col-span-full flex justify-center"
          >
            <button onClick={() => navigate("/products")} className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              Xem Tất Cả
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;
