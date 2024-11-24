import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import ProductsPage from "./components/PageProduct/ProductsPage";
import Footer from "./components/Footer/Footer";
import NavbarTop from "./components/NavbarTop/NavbarTop";
import HomePage from "./components/HomePage/HomePage";
import Popup from "./components/Popup/Popup";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <Router>
      <main className="overflow-x-hidden">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={<HomePage handleOrderPopup={handleOrderPopup} />}
            />

            {/* Products Page */}
            <Route
              path="/products"
              element={
                <div className="bg-gray-100">
                  <NavbarTop />
                  <ProductsPage handleOrderPopup={handleOrderPopup} />
                  <Footer />
                </div>
              }
            />
          </Routes>
        <Popup orderPopup={orderPopup} setOrderPopup={handleOrderPopup} />
      </main>
    </Router>
  );
};

export default App;
