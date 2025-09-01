import React from "react";

type Props = { params: { id: string } };

export default function PollDetail({ params }: Props) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold">Poll {params.id}</h1>
      <p className="text-sm text-muted-foreground mt-2">Poll detail page — implement fetching logic here.</p>
    </div>
  );
}
