import { NavLink } from "react-router-dom";

export default function FeedbackModal({ feedback, setFeedback }) {
  const handleClose = () => {
    setFeedback(false);
    console.log(feedback);
  };

  const handleNewPost = () => {
    setFeedback(false);
  };

  return (
    <div
      id="default-modal"
      className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-onyx-950 bg-opacity-75"
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
        <div className="relative bg-ice-200 rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Your item is successfully posted!
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleClose}
            >
              x
            </button>
          </div>
          <div className="flex items-center p-4 md:p-5  border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-ice-100 bg-drab-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleNewPost}
            >
              Post another
            </button>

            <NavLink to="/listings">
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm bg-gradient-to-r  from-sage-300 to-rust-300 font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                View listings
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
