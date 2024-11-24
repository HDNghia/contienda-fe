import React from "react";
import BannerImg from "../../assets/women/women2.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
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

const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Phần hình ảnh */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView={"show"}
            data-aos="zoom-in"
          >
            <img
              src={BannerImg}
              alt=""
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </motion.div>
          {/* Phần chi tiết nội dung */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView={"show"}
            >
              <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
                Giảm Giá Mùa Đông Lên Đến 50%
              </h1>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                variants={fadeUp(0.3)}
                initial="hidden"
                whileInView={"show"}
                data-aos="fade-up" className="flex items-center gap-4"
              >
                <div data-aos="fade-up" className="flex items-center gap-4">
                  <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                  <p>Sản Phẩm Chất Lượng</p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeUp(0.5)}
                initial="hidden"
                whileInView={"show"}
                data-aos="fade-up" className="flex items-center gap-4"
              >
                <IoFastFood className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                <p>Giao Hàng Nhanh</p>
              </motion.div>
              <motion.div
                variants={fadeUp(0.8)}
                initial="hidden"
                whileInView={"show"}
                data-aos="fade-up" className="flex items-center gap-4"
              >
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Phương Thức Thanh Toán Dễ Dàng</p>
              </motion.div>
              <motion.div
                variants={fadeUp(0.8)}
                initial="hidden"
                whileInView={"show"}
                data-aos="fade-up" className="flex items-center gap-4"
              >
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                <p>Nhận Ưu Đãi</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
