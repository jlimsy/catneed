import PostRequestForm from "../components/PostRequestForm";

export default function RequestPage({ user }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 mt-10">
      <div className="w-full bg-rust-300 border rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Post a Request
          </h1>
          <PostRequestForm user={user} />
        </div>
      </div>
    </div>
  );
}
