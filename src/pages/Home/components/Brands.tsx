function Brands() {
  const brandLogos = [
    {
      name: "Yamaha",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(1).svg",
    },
    {
      name: "Honda",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(2).svg",
    },
    {
      name: "Suzuki",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(3).svg",
    },
    {
      name: "Kawasaki",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(4).svg",
    },
    {
      name: "BMW",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(5).svg",
    },
    {
      name: "Ducati",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(6).svg",
    },
    {
      name: "Harley",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(7).svg",
    },
    {
      name: "KTM",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(8).svg",
    },
    {
      name: "Triumph",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(9).svg",
    },
    {
      name: "Aprilia",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(10).svg",
    },
    {
      name: "Royal Enfield",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(11).svg",
    },
    {
      name: "MV Agusta",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(12).svg",
    },
    {
      name: "Hero",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(13).svg",
    },
    {
      name: "Bajaj",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(14).svg",
    },
    {
      name: "TVS",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(15).svg",
    },
    {
      name: "Vespa",
      src: "https://tranquil-raindrop-867750.netlify.app/logo-%20(16).svg",
    },
  ];

  return (
    <section className="mt-16 overflow-hidden">
      <div className=" mx-auto px-4">
        <div className="flex justify-center">
          <h2 className="text-3xl font-mono font-semibold mb-10 border-b-4 border-primary">
            Our Brands
          </h2>
        </div>

        <div className="whitespace-nowrap overflow-hidden mb-10">
          <div className="flex animate-slide-left gap-16">
            {brandLogos.concat(brandLogos).map((brand, index) => (
              <img
                key={`${brand.name}-${index}`}
                src={brand.src}
                alt={brand.name}
                className="h-12 w-auto"
              />
            ))}
          </div>
        </div>

        <div className="whitespace-nowrap overflow-hidden">
          <div className="flex animate-slide-right gap-16">
            {brandLogos
              .reverse()
              .concat(brandLogos)
              .map((brand, index) => (
                <img
                  key={`${brand.name}-rev-${index}`}
                  src={brand.src}
                  alt={brand.name}
                  className="h-12 w-auto"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brands;
