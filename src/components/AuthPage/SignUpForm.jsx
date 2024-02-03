import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up Form</h1>

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

      <button>Submit</button>
    </form>
  );
}
