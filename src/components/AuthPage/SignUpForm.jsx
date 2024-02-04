import { useForm } from "react-hook-form";
import { signUp } from "../../utilities/users-service";

export default function SignUpForm({ setNewUser }) {
  const form = useForm();
  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState;

  const handleClick = () => {
    setNewUser(false);
  };

  const onSubmit = async (event) => {
    try {
      const { username, email, password, postal } = event;
      const formData = { username, email, password, postal };

      const user = await signUp(formData);
      console.log("client", formData);
      console.log("server", user);
    } catch (error) {
      console.log("Unable to sign-up", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required.",
                    },
                  })}
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>

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

              <div>
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  type="password"
                  id="confirm"
                  {...register("confirm", {
                    required: {
                      value: true,
                      message: "Please confirm your password.",
                    },
                    validate: {
                      value: (value) =>
                        value === watch("password") || "Password must match.",
                    },
                  })}
                />
                {errors.confirm && <p>{errors.confirm.message}</p>}
              </div>

              <div>
                <label htmlFor="postal">Postal Code</label>
                <input
                  type="text"
                  id="postal"
                  {...register("postal", {
                    required: {
                      value: true,
                      message: "Postal code is required.",
                    },
                    pattern: {
                      value: /\d{6}$/,
                      message: "Postal code must be 6-digits.",
                    },
                  })}
                />
                {errors.postal && <p>{errors.postal.message}</p>}
              </div>

              <button type="submit">Submit</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  className="font-medium text-jade-500 cursor-pointer"
                  onClick={handleClick}
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
