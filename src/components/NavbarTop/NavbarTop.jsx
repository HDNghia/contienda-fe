import Logo from "../../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { UpdateFollower } from "react-mouse-follower";
import { useNavigate } from "react-router-dom";

const NavbarTopMenu = [
  {
    id: 1,
    title: "Trang chủ",
    link: "hero",
  },
  {
    id: 2,
    title: "Sản phẩm",
    link: "products",
  },
  {
    id: 3,
    title: "Giới thiệu",
    link: "about-us",
  },
  {
    id: 4,
    title: "Liên hệ",
    link: "contact",
  },
];

const NavbarTop = () => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate("/", { state: { sectionId: id } }); // Navigate to home with sectionId
  };

  return (
    <div className="w-full bg-primary text-white z-50 shadow-lg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="container flex justify-between items-center py-3 md:py-8"
      >
        {/* Logo Section */}
        <div>
          <img src={Logo} alt="Logo" className="max-w-[100px] invert" />
        </div>
        {/* Menu Section */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 relative z-40">
            {NavbarTopMenu.map((item) => (
              <li key={item.id}>
                <UpdateFollower
                  mouseOptions={{
                    backgroundColor: "white",
                    zIndex: 9999,
                    followSpeed: 1.5,
                    scale: 5,
                    mixBlendMode: "difference",
                  }}
                >
                  <button
                    onClick={() => handleNavigation(item.link)}
                    className="inline-block text-base font-semibold py-2 px-3 uppercase"
                  >
                    {item.title}
                  </button>
                </UpdateFollower>
              </li>
            ))}
          </ul>
        </div>
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <MdMenu className="text-4xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default NavbarTop;
