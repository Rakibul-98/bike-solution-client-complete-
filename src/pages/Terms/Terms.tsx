import bike from '../../assets/images/bike-5.jpg';

export default function Terms() {
  return (
    <div className="w-[91%] mx-auto my-10">
      <div className="">
        {/* Hero Section */}
          <h1 className="text-3xl font-mono font-semibold border-b-4 w-fit pe-2 border-primary mb-5">
            Terms & Conditions
          </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8 pe-5">
            {/* Introduction */}
            <section className="">
              <h2 className="text-xl font-semibold text-primary mb-2">
                1. Introduction
              </h2>
              <p className="text-base-content/90">
                These Terms and Conditions govern your use of the PedalPower
                website and services. By accessing or using our platform, you
                agree to comply with these terms.
              </p>
            </section>

            {/* Orders and Payments */}
            <section className="">
              <h2 className="text-xl font-semibold text-primary mb-2">
                2. Orders & Payments
              </h2>
              <ul className="space-y-3 list-disc pl-5 text-base-content/90">
                <li>All orders are subject to product availability</li>
                <li>
                  Prices are displayed in your local currency but charged in USD
                </li>
                <li>We accept Visa, MasterCard, PayPal, and Apple Pay</li>
                <li>Full payment is required before order processing</li>
                <li>Sales tax will be added where applicable</li>
              </ul>
            </section>

            {/* Shipping */}
            <section className="">
              <h2 className="text-xl font-semibold text-primary mb-2">
                3. Shipping Policy
              </h2>
              <div className="space-y-3 text-base-content/90">
                <p>
                  We ship worldwide with delivery times varying by location.
                  Most orders ship within 1-2 business days.
                </p>
                <p>
                  Shipping costs are calculated at checkout based on weight and
                  destination. Free shipping on orders over $200.
                </p>
                <p>
                  You will receive tracking information via email once your
                  order ships.
                </p>
              </div>
            </section>

            {/* Returns */}
            <section className="">
              <h2 className="text-xl font-semibold text-primary mb-2">
                4. Returns & Warranty
              </h2>
              <div className="space-y-3 text-base-content/90">
                <p>
                  We offer 30-day returns on unused items with original
                  packaging. Buyer pays return shipping unless item is
                  defective.
                </p>
                <p>
                  All bikes come with a 2-year manufacturer's warranty covering
                  defects in materials and workmanship.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="lg:w-1/3 space-y-8">
            <div className="card p-6 shadow-sm bg-base-100">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <img
                  src={bike}
                  alt="Premium Bikes"
                  className="rounded-lg object-cover w-full h-64"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Why Choose PedalPower?
              </h3>
              <ul className="space-y-2 text-base-content/90">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Premium quality bikes and accessories</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Free assembly service with every bike purchase</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Expert customer support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Sustainable packaging</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
