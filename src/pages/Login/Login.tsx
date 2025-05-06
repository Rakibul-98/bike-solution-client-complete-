import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../util/verifyToken";
import loginImg from "../../assets/images/login.svg";
import toast from "react-hot-toast";
import { APIErrorType } from "../../interfaces/interfaces";

type formDataType = {
  email: string;
  password: string;
};

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<formDataType> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));

      toast.success("Login successful!");

      const dashboardPath = `/${user?.role?.toLowerCase()}Dashboard`;

      const from = location.state?.from;
      if (!from || from.includes("Dashboard")) {
        navigate(dashboardPath, { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as APIErrorType)?.data?.message ||
        "Login failed! Invalid credentials!!";
      toast.error(errorMessage);
    }
  };

  const handleUserLoginFill = () => {
    setValue("email", "user@example.com");
    setValue("password", "12345");
  };

  const handleAdminLoginFill = () => {
    setValue("email", "admin@example.com");
    setValue("password", "123456");
  };

  return (
    <div className="w-[91%] mx-auto my-5 min-h-[70vh] md:flex justify-center">
      <div className="md:w-1/2 ">
        <img src={loginImg} alt="Login" className="w-[90%] mx-auto md:ms-0 md:w-[70%]" />
      </div>
      <div className=" flex items-center justify-center">
        <div className=" shadow-lg rounded-lg p-8 h-fit">
          <h2 className="text-4xl font-bold text-center mb-6 ">
            Welcome Back! 👋
          </h2>
          <div className="flex gap-3 my-3">
            <button
              type="button"
              onClick={handleUserLoginFill}
              className="w-1/2 hover:bg-secondary hover:text-base-100 border border-secondary text-secondary px-4 py-1 rounded-md"
            >
              User Login
            </button>
            <button
              type="button"
              onClick={handleAdminLoginFill}
              className="w-1/2 hover:bg-secondary hover:text-base-100 border border-secondary text-secondary px-4 py-1 rounded-md"
            >
              Admin Login
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>User email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className={`${
                  errors.email && "border-red-500 focus:outline-red-500"
                } w-full px-4 py-2 border border-gray-300 rounded-lg`}
                placeholder="Email"
              />
            </div>

            <div>
              <label>Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className={`${
                  errors.password && "border-red-500 focus:outline-red-500"
                } w-full px-4 py-2 border border-gray-300 rounded-lg`}
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary/80 text-base-100 py-2 rounded-lg hover:bg-primary transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-secondary underline hover:no-underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
