import React, {useEffect, useState} from "react";
import Img1 from "../../assets/shirt/shirt.png";
import Img2 from "../../assets/shirt/shirt2.png";
import Img3 from "../../assets/shirt/shirt3.png";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

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
//     image: Img1,
//     title: "Trang Phục Thường Ngày",
//     description:
//       "Trang phục thoải mái, phù hợp để mặc hàng ngày hoặc trong các buổi đi chơi nhẹ nhàng.",
//     price: "700.000₫",
//     delay: 0.5,
//   },
//   {
//     id: 2,
//     image: Img2,
//     title: "Áo In Họa Tiết",
//     description:
//       "Áo in họa tiết độc đáo, mang lại phong cách nổi bật và trẻ trung.",
//     price: "850.000₫",
//     delay: 0.8,
//   },
//   {
//     id: 3,
//     image: Img3,
//     title: "Áo Sơ Mi Nữ",
//     description:
//       "Áo sơ mi thiết kế tinh tế, phù hợp với phong cách thanh lịch và hiện đại.",
//     price: "900.000₫",
//     delay: 1.1,
//   },
// ];

const TopProducts = ({ handleOrderPopup }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://be.contienda.wealthfarming.org/api/globals/best-product?depth=1&draft=false&locale=undefined"
        );
        const data = await response.json();

        // Map the API response to the desired format
        const formattedData = [
          {
            id: data.product_1.id,
            title: data.product_1.title,
            image: `https://be.contienda.wealthfarming.org${data.image_1.url}`, // Assuming URL needs to be used as an image source
            description: data.product_1.description,
            price: `${data.product_1.price}`,
            delay: 0.5,
          },
          {
            id: data.product_2.id,
            title: data.product_2.title,
            image: `https://be.contienda.wealthfarming.org${data.image_2.url}`,
            description: data.product_2.description,
            price: `${data.product_2.price}`,
            delay: 0.8,
          },
          {
            id: data.product_3.id,
            title: data.product_3.title,
            image: `https://be.contienda.wealthfarming.org${data.image_3.url}`,
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
    <div>
      <div className="container pt-5">
        {/* Phần tiêu đề */}
        <div className="text-left mb-24">
          <motion.h1
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView={"show"}
            data-aos="fade-up"
            className="text-3xl font-bold"
          >
            Sản Phẩm Tốt Nhất
          </motion.h1>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView={"show"}
            data-aos="fade-up"
            className="text-xs text-gray-400"
          >
            Chúng tôi cung cấp các sản phẩm chất lượng cao, phù hợp với mọi nhu cầu của bạn.
          </motion.p>
        </div>
        {/* Phần sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {productsData.map((data) => (
            <motion.div
              variants={fadeUp(data.delay)}
              key={data.id}
              initial="hidden"
              whileInView={"show"}
              data-aos="zoom-in"
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* Phần hình ảnh */}
              <div className="h-[100px]">
                <img
                  src={data.image}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>
              {/* Phần chi tiết */}
              <div className="p-4 text-center">
                {/* Xếp hạng sao */}
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                  {data.description}
                </p>
                <p className="text-lg font-semibold text-gray-800 group-hover:text-white">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={() => handleOrderPopup()}
                >
                  Đặt Hàng Ngay
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
