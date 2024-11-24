import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Kiểm tra tính hợp lệ của form
  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Vui lòng nhập họ và tên.";
    if (!formData.email) {
      tempErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email không hợp lệ.";
    }
    if (!formData.phone) {
      tempErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      tempErrors.phone = "Số điện thoại không hợp lệ.";
    }
    if (!formData.message) tempErrors.message = "Vui lòng nhập tin nhắn.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Xử lý khi gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:3000/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Convert formData to JSON format
        });
  
        if (response.ok) {
          // Handle successful response
          setSuccess(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setErrors({});
        } else {
          // Handle server errors
          const errorData = await response.json();
          console.error("Failed to submit form:", errorData);
          setSuccess(false);
        }
      } catch (error) {
        // Handle network errors
        console.error("Error submitting form:", error);
        setSuccess(false);
      }
    }
  };
  

  return (
    <div className="bg-gray-100 py-8 px-4 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-[500px] w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Liên Hệ Với Chúng Tôi</h2>
        {success && (
          <div className="text-green-600 mb-4 text-center">
            Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Họ và Tên */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Họ và Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 mt-1 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 mt-1 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Số Điện Thoại */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Số Điện Thoại
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 mt-1 border rounded-md ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Tin nhắn */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium"
            >
              Tin Nhắn
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 mt-1 border rounded-md ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Nút Gửi */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
