import { useForm } from "react-hook-form";

export default function PostalModal() {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (event) => {
    const { postal } = event;
    const formData = { postal };
    console.log("postal code", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Update postal code</button>
      </form>
    </div>
  );
}
