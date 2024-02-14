import { useForm } from "react-hook-form";
import { updatePostal } from "../../utilities/postal-service";
import debug from "debug";
import postalFirst2Digits from "../../assets/validatePostal";

const log = debug("catneed:components:PostalInput");
localStorage.debug = "catneed:*";

export default function PostalInput({
  setPostal,
  setPostalAlert,
  postalAlert,
}) {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // const validatePostalCode = (value) => {
  //   // Check if value is exactly 6 characters long and the first two characters meet the criteria
  //   if (
  //     value.length === 6 &&
  //     postalFirst2Digits.some((twoDigits) => value.startsWith(twoDigits))
  //   ) {
  //     return true; // Postal code is valid
  //   }
  //   return "Please enter a valid postal code.";
  // };

  const onSubmit = async (event) => {
    log("event %o", event);

    try {
      const formData = { postal: event.postal };
      log("formData %o", formData);
      const postalCode = await updatePostal(formData);
      setPostal(postalCode.postal);
      // log("postalCode.postal %o", postalCode.postal);

      // log("postalAlert before %o", postalAlert);
      setPostalAlert(!postalCode.postal);
      // log("postalAlert after %o", postalAlert);
    } catch (error) {
      // console.log("Unable to update postal code", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
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

        <button
          type="submit"
          className="bg-rust-400 text-ice-100 hover:bg-sage-300 hover:text-onyx-950 focus:ring-sage-400 my-2"
        >
          Update postal code
        </button>
      </form>
    </div>
  );
}
