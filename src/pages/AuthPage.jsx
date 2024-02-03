import LoginForm from "../components/AuthPage/LoginForm";
import SignUpForm from "../components/AuthPage/SignUpForm";

export default function AuthPage() {
  return (
    <div className="grid sm:grid-cols-2">
      <div>
        <h1>Auth Page</h1>
        <SignUpForm />
        <LoginForm />
      </div>
      <div>Scroll cards here</div>
    </div>
  );
}
