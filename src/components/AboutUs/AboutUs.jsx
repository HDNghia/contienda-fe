import aboutUs from '../../assets/Banner/aboutUs.png'

const AboutUs = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Phần tiêu đề */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Giới thiệu</h1>
          <p className="text-gray-600 mt-4">
            Tìm hiểu thêm về sứ mệnh, giá trị và đội ngũ đứng sau những nỗ lực của chúng tôi.
          </p>
        </div>

        {/* Phần nội dung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Phần hình ảnh */}
          <div className="flex justify-center">
            <img
              src={aboutUs}
              alt="Đội Ngũ Của Chúng Tôi"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Phần văn bản */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Chúng Tôi Là Ai
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chúng tôi là những nghệ nhân và nhà cung cấp uy tín chuyên về các sản phẩm
              điêu khắc đá mỹ nghệ. Với niềm đam mê và sự tận tâm, chúng tôi tạo ra những
              tác phẩm tinh xảo, mang đậm nét đẹp văn hóa và nghệ thuật truyền thống.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm đá mỹ nghệ
              chất lượng cao, thể hiện sự bền vững, tinh tế và giá trị vượt thời gian.
              Chúng tôi luôn đặt sự hài lòng của khách hàng và tính chân thực trong từng
              sản phẩm lên hàng đầu.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
