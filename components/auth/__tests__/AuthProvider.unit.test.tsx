import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "../AuthProvider";

function Consumer() {
  const { user, signin, signout } = useAuth();
  return (
    <div>
      <div data-testid="user-email">{user?.email ?? "anonymous"}</div>
      <button onClick={() => signin({ email: "a@b.com", password: "x" })}>
        do-signin
      </button>
      <button onClick={() => signout()}>do-signout</button>
    </div>
  );
}

describe("AuthProvider - unit", () => {
  it("exposes null user initially and updates on signin (happy path)", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("user-email")).toHaveTextContent("anonymous");

    await user.click(screen.getByText("do-signin"));

    expect(screen.getByTestId("user-email")).toHaveTextContent("a@b.com");
  });

  it("signout resets user to null (edge/failure recovery)", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await user.click(screen.getByText("do-signin"));
    expect(screen.getByTestId("user-email")).toHaveTextContent("a@b.com");

    await user.click(screen.getByText("do-signout"));
    expect(screen.getByTestId("user-email")).toHaveTextContent("anonymous");
  });

  it("throws when useAuth is used outside provider (edge case)", () => {
    const renderOutside = () => render(<Consumer />);
    expect(renderOutside).toThrow(/within AuthProvider/i);
  });
});
