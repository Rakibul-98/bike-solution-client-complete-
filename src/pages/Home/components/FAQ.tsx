import { useState } from "react";
import faq from '../../../assets/svg/FAQs.svg';

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button in the top right corner and follow the registration process.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to 'My Account' settings and select 'Edit Profile' to make changes.",
  },
  {
    question: "Can I change my email address?",
    answer: "Yes, go to profile settings and update your email address after verifying it.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use industry-standard encryption to keep your information safe.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* FAQ List */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                onClick={() => toggle(index)}
                className="cursor-pointer rounded-lg p-4 shadow-sm transition hover:shadow-md "
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.question}</h3>
                  <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                </div>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600 text-sm">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src={faq}
            alt="FAQ"
            className=""
          />
        </div>
      </div>
    </section>
  );
}
