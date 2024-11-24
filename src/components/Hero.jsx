import React, { useEffect, useState } from "react";
import { UpdateFollower } from "react-mouse-follower";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import Navbar from "../components/Navbar";

const fetchAPI = async () => {
  try {
    const response = await fetch(`https://be.contienda.wealthfarming.org/api/globals/product-recommend?depth=1&draft=false&locale=undefined`);
    console.log('check response: ', response);
    if (!response.ok) {
      const errorText = await response.text(); // Get the HTML or error message
      throw new Error(`Server Error: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API:", error.message);
    return null;
  }
};


const mapAPIToHeadphoneData = (apiData) => {
  return [
    {
      id: apiData.product_1.id,
      image: `https://be.contienda.wealthfarming.org${apiData.image_1.url}`, // Assuming images are Fanta1, Fanta2, etc.
      title: apiData.product_1.title,
      subtitle: apiData.product_1.description,
      price: `${apiData.product_1.price}`,
      bgColor: "#cf4f00", // You can decide this dynamically if needed
    },
    {
      id: apiData.product_2.id,
      image: `https://be.contienda.wealthfarming.org${apiData.image_2.url}`,
      title: apiData.product_2.title,
      subtitle: apiData.product_2.description,
      price: `${apiData.product_2.price}`,
      bgColor: "#727272",
    },
    {
      id: apiData.product_3.id,
      image: `https://be.contienda.wealthfarming.org${apiData.image_3.url}`,
      title: apiData.product_3.title,
      subtitle: apiData.product_3.description,
      price: `${apiData.product_3.price}`,
      bgColor: "#ac1a00",
    },
  ];
};

const SlideRight = (delay) => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  };
};



const Hero = ({ handleOrderPopup }) => {
  const [headphoneData, setHeadphoneData] = useState([]);
  const [activeData, setActiveData] = useState(null); // Initially null to handle loading state

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetchAPI();
      if (apiData) {
        const mappedData = mapAPIToHeadphoneData(apiData);
        setHeadphoneData(mappedData);
          setActiveData(mappedData[0]);
      }
    };

    fetchData();
  }, []);

  const handleActiveData = (data) => {
    setActiveData(data);
  };

  if (!activeData) {
    return <div>Loading...</div>; // Add a loading state while activeData is null
  }

  return (
    <>
      <motion.section
        initial={{ backgroundColor: activeData.bgColor }}
        animate={{ backgroundColor: activeData.bgColor }}
        transition={{ duration: 0.8 }}
        className="bg-brandDark text-white"
      >
        {/* Navbar Component */}
        <Navbar />

        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[605px]">
          {/* Headphone Info Section */}
          <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px] order-2 md:order-1">
            <div className="space-y-5 text-center md:text-left">
              <AnimatePresence mode="wait">
                  <motion.h1
                    key={activeData.id}
                    variants={SlideRight(0.2)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="text-3xl lg:text-6xl xl:text-7xl font-bold font-handwriting text-shadow"
                  >
                    {activeData.title}
                  </motion.h1>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeData.id}
                  variants={SlideRight(0.4)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="text-sm leading-loose text-white/80"
                >
                  {activeData.subtitle}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: activeData.bgColor,
                    zIndex: 9999,
                    followSpeed: 0.5,
                    rotate: -720,
                    scale: 6,
                    backgroundElement: (
                      <div>
                        <img src={activeData.image} alt="" />
                      </div>
                    ),
                  }}
                >
                  <motion.button
                    key={activeData.id}
                    variants={SlideRight(0.6)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    style={{ color: activeData.bgColor }}
                    className="px-4 py-2 bg-white inline-block font-normal rounded-sm"
                    onClick={() => handleOrderPopup()}
                  >
                    Đặt ngay
                  </motion.button>
                </UpdateFollower>
              </AnimatePresence>

              {/* Headphone List Separator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center md:justify-start gap-4 !md:mt-24 !mb-10"
              >
                <div className="w-20 h-[1px] bg-white"></div>
                <p className="uppercase text-sm ">Đề Xuất Hàng Đầu</p>
                <div className="w-20 h-[1px] bg-white"></div>
              </motion.div>

              {/* Headphone List Switcher */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="grid grid-cols-3 gap-10"
              >
                {headphoneData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleActiveData(item)}
                    className="cursor-pointer space-y-3 hover:scale-105 transition-all"
                  >
                    <div className="flex justify-center">
                      <img
                        src={item.image}
                        alt=""
                        className={`w-[80px] img-shadow ${
                          activeData.image === item.image
                            ? "opacity-100 scale-110"
                            : "opacity-50"
                        }`}
                      />
                    </div>
                    <div className="!mt-6 space-y-1 text-center">
                      <p className="text-base line-through opacity-50">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </p>
                      <p className="text-xl font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex flex-col justify-end items-center relative order-1 md:order-2 ">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0, ease: easeInOut }}
                exit={{
                  opacity: 0,
                  x: -100,
                  transition: {
                    duration: 0.4,
                  },
                }}
                src={activeData.image}
                alt=""
                className="w-[150px] md:w-[200px] xl:w-[350px] img-shadow relative z-10"
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Hero;
