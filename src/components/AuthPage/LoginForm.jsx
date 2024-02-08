import { useForm } from "react-hook-form";
import { login } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setNewUser, setUser }) {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    try {
      const { email, password } = event;
      const formData = { email, password };

      const user = await login(formData);
      setUser(user);

      navigate("/browse");
    } catch (error) {
      console.log("Unable to login", error);
    }
    console.log(event);
  };

  const handleClick = () => {
    setNewUser(true);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-rust-400 p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Valid email is required.",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password of minimum 6 chars is required.",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button>Login</button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <span
                className="font-medium text-jade-500 cursor-pointer"
                onClick={handleClick}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
