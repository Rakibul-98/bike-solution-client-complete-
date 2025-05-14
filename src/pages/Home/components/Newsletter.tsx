import { useForm } from "react-hook-form";
import newsletter from '../../../assets/svg/newsletter.svg';
import toast from "react-hot-toast";

type NewsletterFormData = {
    email: string;
  };

export default function Newsletter() {
  const { register, handleSubmit, reset } = useForm<NewsletterFormData>();

  const onSubmit = (data: NewsletterFormData) => {
    if (data) {
      toast.success("Thanks for connect with us!");
      reset();
    }
  };

  return (
    <section className="w-[92%] mx-auto my-10">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={newsletter}
            alt="Newsletter"
            className="lg:w-[70%] mx-auto md:mx-0"
          />
        </div>

        <div>
          <h2 className="text-3xl font-mono font-semibold border-b-4 border-primary w-fit">Stay in touch</h2>
          <p className="my-2">
            Subscribe to our newsletter for updates, deals, and more.
          </p>
          <p className="mb-6 text-sm italic w-[90%]">We don’t believe in spam — just pure value. Expect updates that matter, offers that thrill, and stories that inspire. Let us drop the latest right into your inbox and keep your wheels turning smoothly, stylishly, and smartly.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
            />
            <button
              type="submit"
              className="bg-primary text-base-100 px-6 py-2 rounded-md hover:bg-secondary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
