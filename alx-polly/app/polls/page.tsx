"use client"
import React from "react";
import PollList from "@/components/polls/PollList";
import { usePolls } from "@/hooks/usePolls";

export default function PollsPage() {
  const { polls, add } = usePolls([
    { id: "1", title: "Favorite programming language?", votes: 12 },
    { id: "2", title: "Best frontend framework?", votes: 8 },
  ]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Polls</h1>
      <PollList polls={polls} />
    </div>
  );
}
