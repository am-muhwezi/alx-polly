"use client"
import React from "react";
import { Button } from "../ui/button";
import Card from "../ui/Card";
import Input, { Label } from "../ui/Input";

type Props = {
  onSubmit?: (data: { email: string; password: string }) => void;
};

export default function LoginForm({ onSubmit }: Props) {
  return (
  <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement & {
          email: HTMLInputElement;
          password: HTMLInputElement;
        };
        onSubmit?.({ email: form.email.value, password: form.password.value });
      }}
      className="space-y-4"
    >
      <Card>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Sign in</Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
