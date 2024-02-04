import LoginForm from "../components/AuthPage/LoginForm";
import ScrollDisplay from "../components/AuthPage/ScrollDisplay";
import SignUpForm from "../components/AuthPage/SignUpForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="md:col-span-1">
        <ScrollDisplay />
      </div>
      <div className="md:col-span-1">
        {newUser ? (
          <SignUpForm setNewUser={setNewUser} setUser={setUser} />
        ) : (
          <LoginForm setNewUser={setNewUser} />
        )}
      </div>
    </div>
  );
}
