function Brands() {
  const brandLogos = [
    { name: "Yamaha", src: "../../../assets/brands/logo- (1).svg" },
    { name: "Honda", src: "/brands/honda.png" },
    { name: "Suzuki", src: "/brands/suzuki.png" },
    { name: "Kawasaki", src: "/brands/kawasaki.png" },
    { name: "BMW", src: "/brands/bmw.png" },
    { name: "Ducati", src: "/brands/ducati.png" },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {brandLogos.map((brand) => (
            <div key={brand.name} className="flex justify-center items-center">
              <img
                src={brand.src}
                alt={brand.name}
                className="max-h-20 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;
