"use client"
import React from "react";
import Card from "../ui/Card";
import { Button } from "../ui/button";

type Poll = { id: string; title: string; votes: number };

export default function PollList({ polls = [] }: { polls?: Poll[] }) {
  if (polls.length === 0) return <div className="text-sm text-muted-foreground">No polls yet</div>;

  return (
    <div className="space-y-3">
      {polls.map((p) => (
        <Card key={p.id} className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium">{p.title}</h3>
            <div className="text-sm text-muted-foreground">{p.votes} votes</div>
          </div>
          <div>
            <Button>Vote</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
