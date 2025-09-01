"use client"
import React from "react";
import { Button } from "../ui/button";
import Card from "../ui/Card";
import Input, { Label } from "../ui/Input";

type Props = { onSubmit?: (data: { name: string; email: string; password: string }) => void };

export default function RegisterForm({ onSubmit }: Props) {
  return (
  <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement & {
          name: HTMLInputElement;
          email: HTMLInputElement;
          password: HTMLInputElement;
        };
        onSubmit?.({ name: form.name.value, email: form.email.value, password: form.password.value });
      }}
      className="space-y-4"
    >
      <Card>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create account</Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
