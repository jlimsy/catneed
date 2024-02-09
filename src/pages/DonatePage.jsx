import PostDonateForm from "../components/PostDonateForm";

export default function DonatePage({ user }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 mt-10">
      <div className="w-full bg-sage-300 border rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Donate an Item
          </h1>
          <PostDonateForm user={user} />
        </div>
      </div>
    </div>
  );
}
