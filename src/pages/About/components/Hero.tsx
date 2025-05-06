import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white">
      <div className=" absolute inset-0 bg-[url('https://i.ibb.co.com/cS5JFWCX/about-banner.jpg')] bg-cover bg-bottom bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg animate-fadeIn">
          Welcome to <span className="text-primary">Bike Solution</span>
        </h1>
        <p className="my-4 text-lg md:text-xl text-gray-300 animate-fadeIn delay-150">
          Your ultimate destination for high-performance bikes and accessories.
        </p>

        <p>
            At <span className="font-bold">Bike Solution</span><sup className="text-[10px]">TM</sup>, we are more than just a bike shop—we are a community of passionate riders dedicated to providing high-quality bicycles, accessories, and expert services. Whether you're a casual rider, an adventure seeker, or a professional cyclist, we have something for everyone!
        </p>
        <div className="mt-6">
          <Link to="/products"
            className="px-6 py-3 text-lg font-semibold bg-primary rounded-md shadow-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Bikes 🚴‍♂️
          </Link>
        </div>
      </div>
    </section>
  )
}
