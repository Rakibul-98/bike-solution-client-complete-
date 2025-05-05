import Banner from "./components/Banner";
import Blogs from "./components/Blogs";
import Brands from "./components/Brands";
import FAQ from "./components/FAQ";
import FeaturedProducts from "./components/FeaturedProducts";
import Newsletter from "./components/Newsletter";
import Promotion from "./components/Promotion";
import PromotionalVideo from "./components/PromotionalVideo";
import Testimonial from "./components/TEstimonial";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <PromotionalVideo />

      <Promotion />
      <Brands />
      <Testimonial />
      <Blogs />
      <FAQ />
      <Newsletter />
    </div>
  );
}
