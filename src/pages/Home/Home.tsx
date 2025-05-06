import Banner from "./components/Banner";
import Blogs from "./components/Blogs";
import Brands from "./components/Brands";
import FAQ from "./components/FAQ";
import FeaturedProducts from "./components/FeaturedProducts";
import Newsletter from "./components/Newsletter";
import Promotion from "./components/Promotion";
import PromotionalVideo from "./components/PromotionalVideo";
import Testimonial from "./components/Testimonial";
import GoTop from "./GoTop";

export default function Home() {
  return (
    <div className="relative">
      <Banner />
      <FeaturedProducts />
      <PromotionalVideo />
      <Promotion />
      <Brands />
      <Testimonial />
      <Blogs />
      <FAQ />
      <Newsletter />
      <GoTop/>
    </div>
  );
}
