import PostForm from "../components/PostForm";

export default function DonatePage({ user }) {
  // console.log("DonatePage | user:", user);
  return <PostForm user={user} />;
}
