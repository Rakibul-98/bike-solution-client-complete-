import { useForm } from "react-hook-form";
import newsletter from '../../../assets/svg/newsletter.svg';

type NewsletterFormData = {
    email: string;
  };

export default function Newsletter() {
  const { register, handleSubmit } = useForm<NewsletterFormData>();

  const onSubmit = (data: NewsletterFormData) => {
    console.log("Newsletter Form Data:", data);
  };

  return (
    <section className="w-full py-12">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={newsletter}
            alt="Newsletter"
            className="w-full h-auto"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">Stay in the Loop</h2>
          <p className=" mb-6">
            Subscribe to our newsletter for updates, deals, and more.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
