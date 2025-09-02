import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../AuthProvider";
import LoginForm from "../LoginForm";

function App() {
  const { user, signin } = useAuth();
  return (
    <div>
      <div aria-label="current-user">{user ? user.email : "anonymous"}</div>
      <LoginForm onSubmit={signin} />
    </div>
  );
}

describe("AuthProvider integration with LoginForm", () => {
  it("signs in and updates consumer UI (happy path)", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByLabelText("current-user")).toHaveTextContent("anonymous");

    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByLabelText("current-user")).toHaveTextContent("jane@example.com");
  });
});
