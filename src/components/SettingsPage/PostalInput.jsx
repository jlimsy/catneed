import { useForm } from "react-hook-form";
import { updatePostal } from "../../utilities/users-service";
import { updateTestPostal } from "../../utilities/postal-service";
import debug from "debug";
import { useState } from "react";

const log = debug("catneed:components:PostalInput");
localStorage.debug = "catneed:*";

export default function PostalInput({ setPostal, setPostalReminder }) {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (event) => {
    log("event %o", event);

    try {
      const formData = { postal: event.postal };
      log("formData %o", formData);
      const postalCode = await updatePostal(formData);
      log("postalCode %o", postalCode.postal);
      setPostal(postalCode.postal);
      setPostalReminder(false);
    } catch (error) {
      console.log("Unable to update postal code", error);
    }
  };

  //! ==== TEST ==== //
  const [test, setTest] = useState("");

  const handleInputChange = async (event) => {
    setTest(event.target.value);
  };

  const handleTestClick = async () => {
    log("test %o", test);
    const testPostal = { postal: test };
    const testCode = await updateTestPostal(testPostal);
    log("testCode %o", testCode);
  };

  //! ==== TEST ==== //

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
      <input onChange={handleInputChange} type="text" id="postal-test" />
      <button onClick={handleTestClick} className="bg-drab-800 text-ice-100">
        send postal code to referencee
      </button>
    </div>
  );
}
