import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiInstagram, FiLinkedin, FiYoutube } from "react-icons/fi";
import logo from "../../assets/images/logo (3) (1).png";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About", "Contact"],
    },
    {
      title: "Legal",
      links: ["Terms of use", "Privacy policy"],
    },
  ];

  const socialLinks = [
    {
      icon: <FiFacebook />, // Facebook Blue
      url: "https://facebook.com/bikesolution",
      className: "hover:bg-blue-600 hover:border-blue-600",
    },
    {
      icon: <FaXTwitter />, // Twitter Blue
      url: "https://twitter.com/bikesolution",
      className: "hover:bg-black hover:border-black",
    },
    {
      icon: <FiInstagram />, // Instagram Pink
      url: "https://instagram.com/bikesolution",
      className: "hover:bg-pink-500 hover:border-pink-500",
    },
    {
      icon: <FiLinkedin />, // LinkedIn Blue
      url: "https://linkedin.com/company/bikesolution",
      className: "hover:bg-[#0077B5] hover:border-[#0077B5]",
    },
    {
      icon: <FiYoutube />, // YouTube Red
      url: "https://youtube.com/bikesolution",
      className: "hover:bg-red-600 hover:border-red-600",
    },
  ];

  return (
    <footer className="bg-primary py-10">
      <div className="w-[92%] mx-auto md:flex justify-between gap-10">
        <div className="w-full md:w-[30%] mb-6 lg:mb-0">
          <div className="flex flex-col items-center md:items-start">
            <div>
              <Link to="/">
                <img className="h-20" src={logo} alt="logo" />
              </Link>
            </div>
            <p className="text-center md:text-left mt-2">
              <strong>Bike Solution Ltd.</strong>
            </p>
          </div>
          <div className="flex gap-3 text-lg justify-center md:justify-start mt-3">
            {socialLinks.map((link, i) => (
              <Link
                key={i}
                className={`border border-black p-[6px] rounded-full hover:rotate-[360deg] transition-all duration-300 hover:text-white ${link.className}`}
                to={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full md:w-[70%] md:flex justify-between">
          <div className="w-full flex justify-around md:justify-normal gap-10 mb-5 md:mb-0 items-center">
          {footerLinks.map((section, i) => (
            <nav key={i}>
              <h6 className="footer-title">{section.title}</h6>
              <div className="">
                {section.links.map((link, i) => (
                  <div key={i}>
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="link link-hover"
                    >
                      {link}
                    </Link>
                  </div>
                ))}
              </div>
            </nav>
          ))}
          </div>
          <div className="col-span-2 w-full h-[200px] md:h-[160px]">
            <iframe
              title="Bike Store Location"
              className="w-full h-full rounded-md shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14601.77046430682!2d90.36453464890553!3d23.802854858150777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d33532b3fb%3A0x2b27b0c01cb2bc0d!2sMirpur-10%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1740022653300!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
}
