import LoginForm from "../components/AuthPage/LoginForm";
import ScrollDisplay from "../components/AuthPage/ScrollDisplay";
import SignUpForm from "../components/AuthPage/SignUpForm";

export default function AuthPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="md:col-span-1">
        <ScrollDisplay />
      </div>
      <div className="md:col-span-1">
        <SignUpForm />
        <LoginForm />
      </div>
    </div>
  );
}
