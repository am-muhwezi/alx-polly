"use client"
import React from "react";
import { Button } from "../ui/button";
import Card from "../ui/Card";
import Input, { Label } from "../ui/Input";

export default function PollCreate({ onCreate }: { onCreate?: (data: { title: string }) => void }) {
  return (
  <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement & { title: HTMLInputElement };
        onCreate?.({ title: f.title.value });
      }}
      className="space-y-4"
    >
      <Card>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Poll title</Label>
            <Input id="title" name="title" />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Poll</Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
