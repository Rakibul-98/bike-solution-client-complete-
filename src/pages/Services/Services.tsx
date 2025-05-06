export default function Services() {
    const serviceCategories = [
      {
        title: "🛒 Shopping Experience",
        items: [
          "Curated product recommendations based on your interests",
          "Wishlist and Save for Later functionality",
          "Seamless checkout experience with multiple payment options"
        ]
      },
      {
        title: "🚚 Order & Delivery",
        items: [
          "Track your order status in real-time",
          "Flexible delivery scheduling",
          "Free shipping on qualifying orders"
        ]
      },
      {
        title: "🔁 Returns & Support",
        items: [
          "Easy returns within 7 days of delivery",
          "24/7 customer support via chat and email",
          "Refunds processed quickly and transparently"
        ]
      },
      {
        title: "🎁 Member Benefits",
        items: [
          "Exclusive deals for registered users",
          "Early access to upcoming sales",
          "Loyalty points with every purchase"
        ]
      }
    ];
  
    return (
      <div className="w-[91%] mx-auto my-10">
        <section>
          <h1 className="text-3xl font-mono border-b-4 border-primary w-fit pe-2 font-semibold tracking-tight mb-2">Our Services</h1>
          <p className="text-base leading-relaxed text-gray-600">
            We offer a wide range of services designed to elevate your shopping experience and support every step of your journey with us.
          </p>
        </section>
  
        <div className="grid md:grid-cols-2 gap-8 mt-5">
          {serviceCategories.map((category, index) => (
            <section key={index} className="p-6 rounded-lg shadow-sm border ">
              <h2 className="text-xl font-medium mb-3">{category.title}</h2>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-2"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }